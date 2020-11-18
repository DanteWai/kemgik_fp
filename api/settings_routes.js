const {Router} = require('express')
const router = Router()
const path = require('path')
const fs = require('fs')
const UserModel = require('../models/User_model')



router.get('/emails', async (req ,res) => {
    let emails = fs.readFileSync(path.join(__dirname,'..','config','emails.json'));
    emails = JSON.parse(Buffer.from(emails).toString())

    return res.json(emails)
})

router.post('/emails', async (req ,res) => {
    let emails = JSON.stringify(req.body)
    fs.writeFileSync(path.join(__dirname,'..','config','emails.json'),emails);

    return res.json({res:true})
})

router.get('/users_count', async (req ,res) => {

    let count = await UserModel.count()
    return res.json(count)
})

router.get('/users', async (req ,res) => {
    let offset = 0
    if(req.query.page > 1)  offset = req.query.page * 15
    let users = await UserModel.getAll(offset)
    return res.json(users)
})

router.get('/users_search', async (req ,res) => {
    let offset = 0
    if(req.query.page > 1)  offset = req.query.page * 15
    let search = req.query.search

    let users = await UserModel.getSearch(search,offset)
    let count = await UserModel.getSearchCount(search)

    return res.json({users:users.rows, count:count.rows[0].count})
})

router.put('/users/:id', async (req ,res) => {
    let id = req.params.id
    let user = req.body
    await UserModel.update(user)
    return res.json({res:true})
})




module.exports = router


