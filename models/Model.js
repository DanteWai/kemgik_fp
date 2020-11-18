const pgClient = require('./../db/pg_connection')


module.exports =  class Model {
    constructor(tableName, schemaName) {
        this.tableName = tableName
        this.schemaName = schemaName
        this.client = pgClient
    }
    async get({where, wherein}){

        if(where){
            return pgClient(this.tableName).withSchema(this.schemaName).select('*').where(where[0],where[1])
        }
        else if(wherein){
            wherein[1] = wherein[1].split(',')
            return pgClient(this.tableName).withSchema(this.schemaName).select('*').whereIn(wherein[0],wherein[1])
        }
        else{
            return pgClient(this.tableName).withSchema(this.schemaName).select('*')
        }

    }
    async insert(row){
        return pgClient(this.tableName).withSchema(this.schemaName).insert(row).returning('*')
    }
    async update(row, fieldName, fieldValue){
        return pgClient(this.tableName).withSchema(this.schemaName).where(fieldName, fieldValue).update(row,['*'])
    }
    async delete(fieldName, fieldValue){
        return pgClient(this.tableName).withSchema(this.schemaName).where(fieldName, fieldValue).del();
    }
    async one(fieldName, fieldValue){
        return pgClient(this.tableName).withSchema(this.schemaName).where(fieldName, fieldValue).first()
    }
    async whereRaw(raw, operator, param){
        return pgClient(this.tableName).withSchema(this.schemaName).where(pgClient.raw(raw),operator,`%${param}%`);
    }
}