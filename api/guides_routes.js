const  date = require("date-and-time")
const {Router} = require('express')
const router = Router()
const GuideModel = require('../models/Guide_model')
const {getOffset} = require('./helpres')
const adminMid = require('./../middleware/admin')



router.get('/', async (req ,res) => {
    let guides = await GuideModel.all(getOffset(req.query.page))
    guides = guides.map(el => {
        el.created_at = date.format(new Date(el.created_at), 'YYYY-MM-DD HH:mm:ss')
        el.updated_at = date.format(new Date(el.updated_at), 'YYYY-MM-DD HH:mm:ss')
        return el
    })
    return res.json(guides)
})

router.get('/full', async (req ,res) => {
    let guides = await GuideModel.full()
    return res.json(guides)
})

router.get('/one/:id', async (req ,res) => {
    let guide = await GuideModel.one('id', req.params.id)
    return res.json(guide)
})



router.get('/count', async (req ,res) => {
    let count = await GuideModel.count()
    return res.json(count)
})

router.post('/',adminMid, async (req ,res) => {
    try {
        let guide = req.body
        await GuideModel.add(guide)
        return res.json({res:true})
    } catch (e) {
        return res.status(500).json({res:false,error:e.message})
    }
})

router.put('/',adminMid, async (req ,res) => {
    try {
        let guide = req.body
        await GuideModel.update(guide,'id',guide.id)
        return res.json({res:true})
    } catch (e) {
        return res.status(500).json({res:false,error:e.message})
    }
})

router.delete('/:id',adminMid, async (req ,res) => {
    try {
        await GuideModel.delete('id', req.params.id)
        return res.json({res:true})
    } catch (e) {
        return res.status(500).json({res:false,error:e.message})
    }
})





module.exports = router


