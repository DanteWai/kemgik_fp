const date = require("date-and-time")
const {Router} = require('express')
const router = Router()
const OrderModel = require('../models/Order_model')
const nodemailer = require("nodemailer");
const path = require('path')
const fs = require('fs')
const {getOffset} = require('./helpres')
const statuses = require('../untils/statuses.json')
const adminMid = require('./../middleware/admin')
const forEach = require('lodash/forEach')

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
        element.status = statuses[element.status]
        element.created_at = date.format(new Date(element.created_at), 'YYYY-MM-DD HH:mm:ss')
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


        //Удаление лишних файлов в папке
        if(order.files.length > 0) {
            let filesArray = [...order.files]
            let dirPath = path.join(__dirname,'..',filesArray[0].path)

            let files = await fs.promises.readdir(dirPath)
            forEach(files, (file, key) => {
                let check = filesArray.findIndex(el => `${el.name}.${el.ext}` === file)
                if(!~check) {
                    fs.promises.unlink(path.join(dirPath,file))
                } else{
                    fs.promises.rename(path.join(dirPath,file), path.join(dirPath,`${key+1}. ${file}`))
                    filesArray[check].name = `${key+1}. ${filesArray[check].name}`
                }
            })
            order.files = JSON.stringify(filesArray)
            fs.promises.writeFile(path.join(dirPath,'_filesInfo.json'), order.files)

        } else {
            order.files = JSON.stringify(order.files)
        }

        await OrderModel.add(order)

        const {mail} = require('../config/config')

        let transporter = nodemailer.createTransport(mail);
        let emails = fs.readFileSync(path.join(__dirname,'..','config','emails.json'));
        emails = JSON.parse(Buffer.from(emails).toString())


        transporter.sendMail({
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

router.post('/transfer', async (req ,res) => {
    try {
        let {files} = req.body

        if(files.length > 0){
            let dirPath = path.join(__dirname,'..',files[0].path)
            let directoryFiles = await fs.promises.readdir(dirPath)

            //const folderPath = '//DESKTOP-G5M2ENJ/filePlatformArch'; //work
            const folderPath = '//WIN-JNNA5MBKSTE/filePlatformArch'; ///home
            let newPath = files[0].path.split('/')
            newPath.splice(1,1)
            newPath = folderPath + newPath.join('/')

            if (!fs.existsSync(newPath)) {
                await fs.promises.mkdir(newPath, {recursive: true})
            }


            let promises = directoryFiles.reduce((result, file) => {
                return result.push(fs.promises.copyFile(path.join(dirPath,file), path.join(newPath,file))) && result
            },[])





            await Promise.allSettled(promises)

            fs.promises.rmdir(dirPath,{recursive:true})
        }




        return res.json({res:true})
    } catch (e) {
        return res.status(500).json({res:false,error:e.message})
    }
})




module.exports = router


