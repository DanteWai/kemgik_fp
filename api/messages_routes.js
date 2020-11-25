const date = require("date-and-time")
const {Router} = require('express')
const router = Router()
const MessagesModel = require('../models/Messages_model')
const {getOffset} = require('./helpres')
const adminMid = require('./../middleware/admin')

router.get('/', async (req ,res) => {
    try {
        let elements = await MessagesModel.all(getOffset(req.query.page))

        elements = elements.map(el => {
            el.created_at = date.format(new Date(el.created_at), 'YYYY-MM-DD HH:mm:ss')
            el.updated_at = date.format(new Date(el.updated_at), 'YYYY-MM-DD HH:mm:ss')
            el.user = `${el.sso_data.fam} ${el.sso_data.name} ${el.sso_data.ot}`
            delete el.sso_data
            return el
        })

        return res.json(elements)
    } catch (e) {
        return res.status(500).json({res:false,error:e.message})
    }
})

router.get('/count', async (req ,res) => {
    try {
        let count = await MessagesModel.count()
        return res.json(count)
    } catch (e) {
        return res.status(500).json({res:false,error:e.message})
    }
})

router.get('/one/:id', async (req ,res) => {
    try {
        let element = await MessagesModel.one('id', req.params.id)
        return res.json(element)
    } catch (e) {
        return res.status(500).json({res:false,error:e.message})
    }
})


router.post('/', async (req ,res) => {
    try {
        let messages = req.body
        await MessagesModel.add(messages)
        return res.json({res:true})
    } catch (e) {
        return res.status(500).json({res:false,error:e.message})
    }
})


module.exports = router


