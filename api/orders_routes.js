const date = require("date-and-time")
const {Router} = require('express')
const router = Router()
const OrderModel = require('../models/Order_model')
const nodemailer = require("nodemailer");
const path = require('path')
const fs = require('fs')
const {getOffset} = require('./helpres')
const statuses = require('../untils/statuses')
const adminMid = require('./../middleware/admin')

//Получение всех заявок
router.get('/', adminMid, async (req ,res) => {
    try {
        let elements = await OrderModel.all(getOffset(req.query.page))
        elements = elements.map(el => {
            el.status = statuses[el.status]
            el.created_at = date.format(new Date(el.created_at), 'YYYY-MM-DD HH:mm:ss')
            el.updated_at = date.format(new Date(el.updated_at), 'YYYY-MM-DD HH:mm:ss')
            return el
        })
        return res.json(elements)

    } catch (e) { return res.status(500).json({res:false,error:e.message})}
})
//Получение количества заявок
router.get('/count', async (req ,res) => {
    try {
        let count = await OrderModel.count()
        return res.json(count)
    } catch (e) {
        return res.status(500).json({res:false,error:e.message})
    }
})
//получение одной заявки
router.get('/one/:id',adminMid, async (req ,res) => {
    try {
        let element = await OrderModel.one('id', req.params.id)
        return res.json(element)
    } catch (e) {
        return res.status(500).json({res:false,error:e.message})
    }
})


router.get('/for_user', async (req ,res) => {
    try {
        let orders = await OrderModel.forUser(req.query.user_id,getOffset(req.query.page))
        let count = await OrderModel.count(req.query.user_id)
        orders = orders.map(el => {
            el.status = statuses[el.status]
            el.created_at = date.format(new Date(el.created_at), 'YYYY-MM-DD HH:mm:ss')
            return el
        })
        return res.json({orders, ...count})
    } catch (e) { return res.status(500).json({res:false,error:e.message})}
})

router.post('/', async (req ,res) => {
    try {
        let order = req.body
        order.status = 'sent'
        order.files = JSON.stringify(order.files)
        const newOrder = await OrderModel.add(order)

        const {mail} = require('../config/config')

        let transporter = nodemailer.createTransport(mail);
        let emails = fs.readFileSync(path.join(__dirname,'..','config','emails.json'));
        emails = JSON.parse(Buffer.from(emails).toString())


        await transporter.sendMail({
            from: '"aa502@yandex.ru',
            to: emails,
            subject: "Новая заявка из КемГИК",
            text: 'Новая заявка на файловой платформе КемГИК',
            //html
        });


        return res.json({res:true})
    } catch (e) {
        return res.status(500).json({res:false,error:e.message})
    }
})

router.put('/:id',adminMid, async (req ,res) => {
    try {
        let id = req.params.id
        let order = req.body
        delete order.id

        await OrderModel.update(order,'id',id)
        return res.json({res:true})
    } catch (e) {
        return res.status(500).json({res:false,error:e.message})
    }
})




module.exports = router


