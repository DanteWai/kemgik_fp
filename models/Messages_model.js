const model = require('./Model')

class Message extends model{
    constructor(tableName, schemaName) {
        super(tableName, schemaName);
    }

    all(offset){
        return this.client(this.tableName)
            .offset(offset).limit(15)
            .leftJoin('users', 'messages.user_id', 'users.id')
            .select('messages.*', 'users.sso_data')
            .orderBy('created_at', 'desc')
    }

    count(){
        return this.client(this.tableName).count('id').first()
    }

    add(guide){
        return this.insert(guide)
    }

}

module.exports = new Message('messages','public');