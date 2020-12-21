const {Router} = require('express')
const router = Router()
const UserModel = require('../models/User_model')


router.get('/:id', async (req ,res) => {
    try {
        return res.status(200).json(await UserModel.findByID(req.params.id))
    } catch (e) {
        return res.status(500).json({res:false})
    }
})

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


