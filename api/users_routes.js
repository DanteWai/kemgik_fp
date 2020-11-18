const {Router} = require('express')
const router = Router()
const UserModel = require('../models/User_model')

/*
*
*       tableBuilder.increments('id').notNullable()
        tableBuilder.integer('user_id').notNullable()
        tableBuilder.jsonb('data')
        tableBuilder.jsonb('files')
        tableBuilder.jsonb('options')
*
* */



router.put('/', async (req ,res) => {
    try {
        let {user_id, contacts} = req.body
        await UserModel.updateContacts(user_id, contacts)
        return res.status(200).json(contacts)
    } catch (e) {
        return res.status(500).json({res:false})
    }
})



module.exports = router


