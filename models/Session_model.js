const model = require('./Model')

class Session extends model{
    constructor(tableName, schemaName) {
        super(tableName, schemaName);
    }

    add(session){
        return this.client(this.tableName)
            .withSchema(this.schemaName)
            .insert(session)
    }
    count(user_id){
        return this.client(this.tableName)
            .withSchema(this.schemaName)
            .count('user_id')
            .where('user_id', user_id)
            .first()

    }
    find(user_id, refreshToken){
        return this.client.select('*').from('sessions').where({user_id, refreshToken}).first()
    }
    update(session, user_id, refreshToken){
        return this.client(this.tableName).withSchema(this.schemaName).where({user_id, refreshToken}).update(session,['*'])
    }
    deleteByToken(refreshToken){
        return this.client(this.tableName).withSchema(this.schemaName).where({refreshToken}).del();
    }
    deleteByUserID(user_id){
        return this.client(this.tableName).withSchema(this.schemaName).where({user_id}).del();
    }
    deleteByIdAndToken(user_id, refreshToken){
        return this.client(this.tableName).withSchema(this.schemaName).where({user_id, refreshToken}).del();
    }
    async checkForLogin(user_id){
        let {count} = await this.count(user_id)
        if(count > 5) await this.deleteByUserID(user_id)

        let allSessions = await this.client(this.tableName).withSchema(this.schemaName).select('*').where({user_id})

        for(let i = 0; i < allSessions.length; i++){
            let expire = +allSessions[i].expiresIn
            if(expire < Date.now()) this.deleteByIdAndToken(user_id, allSessions[i].refreshToken )
        }

        return true
    }
}

module.exports = new Session('sessions','public');