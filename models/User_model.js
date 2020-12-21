const model = require('./Model')

class User extends model{
    constructor(tableName, schemaName) {
        super(tableName, schemaName);
    }
    find(login){
        return this.one('login',login)
    }
    findByAuthID(AuthID){
        return this.one('AuthID',AuthID)
    }
    findByID(id){
        return this.one('id',id)
    }
    add(user){
        return this.insert(user)
    }
    getAll(offset=0){
        return this.client(this.tableName).select('*')
            .offset(offset).limit(15)
            .orderBy('created_at', 'desc')
    }

    getSearch(search, offset){
        return this.client.raw(`
        select * from users
        where LOWER(sso_data ->> 'fam')||' '||LOWER(sso_data ->> 'name')||' '||LOWER(sso_data ->> 'ot') like '%${search}%'
        or sso_data ->> 'login' like '%${search}%'
        offset ${offset}
        ;`)
    }
    getSearchCount(search){
        return this.client.raw(`
        select count(id) from users
        where LOWER(sso_data ->> 'fam')||' '||LOWER(sso_data ->> 'name')||' '||LOWER(sso_data ->> 'ot') like '%${search}%'
        or sso_data ->> 'login' like '%${search}%';`)
    }



    async update(user) {
        return super.update(user, 'id', user.id);
    }

    updateContacts(user_id, contacts){
        return this.client(this.tableName).where('id',user_id).update({
            contacts
        })
    }

    count(){
        let query = this.client(this.tableName).count('id')
        query.first()

        return query
    }

}

module.exports = new User('users','public');