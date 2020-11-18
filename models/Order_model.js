const model = require('./Model')

class Order extends model{
    constructor(tableName, schemaName) {
        super(tableName, schemaName);
    }

    add(order){
        return this.insert(order)
    }

    forUser(user_id, offset){
        return this.client(this.tableName).select('id','data','status','created_at')
            .where('user_id',user_id).offset(offset).limit(15)
            .orderBy('created_at', 'desc')
    }
    all(offset){
        return this.client(this.tableName).select('*')
            .offset(offset).limit(15)
            .orderBy('created_at', 'desc')
    }
    count(user_id){
        let query = this.client(this.tableName).count('user_id')
        if(user_id) query.where('user_id', user_id)
        query.first()

        return query
    }

}

module.exports = new Order('orders','public');