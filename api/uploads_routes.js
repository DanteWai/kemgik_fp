const {Router} = require('express')
const router = Router()
const path = require('path')


router.get('/:dateFolder/:folder/:filename', async (req ,res) => {
    try {
        let {dateFolder, folder, filename} = req.params
        const file = path.join(__dirname,'..','uploads', dateFolder,folder, filename);
        res.download(file);
    } catch (e) {
        return res.status(500).json({res:false})
    }
})



module.exports = router


