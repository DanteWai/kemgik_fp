const model = require('./Model')

class Guide extends model{
    constructor(tableName, schemaName) {
        super(tableName, schemaName);
    }

    all(offset){
        return this.client(this.tableName).select('id','name','created_at','updated_at')
            .offset(offset).limit(15)
            .orderBy('created_at', 'desc')
    }

    full(){
        return this.client(this.tableName).select('id','name','text')
    }

    count(){
        return this.client(this.tableName).count('id').first()
    }

    add(guide){
        return this.insert(guide)
    }

}

module.exports = new Guide('guides','public');

