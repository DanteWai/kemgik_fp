const {Router} = require('express')
const router = Router()
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


let uploads = {}
router.post('/upload_delete', upload.single('file'), function (req, res) {

    let {folder, filename, savePath} = bodyParser(req.body)

    /*if(fs.existsSync(savePath))
        fs.unlinkSync(savePath)*/

    if(uploads[folder]){
        let index = uploads[folder].findIndex(el => el.filename === filename)
        if(index >= index) uploads[folder].splice(index,1)
        if(uploads[folder].length === 0) delete uploads[folder]
    }

    return res.json({res:true})
})

router.post('/upload', upload.single('file'), function (req, res) {

    let {start, dateFolder, folder, filename, parts, part, savePath} = bodyParser(req.body)
    //dateFolder: //2020-11-10, folder: timestamp-user_id
    if(Number(start) === 0){ //если это первый кусок файла
        if(!uploads[folder]) uploads[folder] = []

        const check = checkUploadFile(folder, filename)
        if(!~check){
            if(parts !== part) uploads[folder].push({filename, parts, part})
            fs.writeFileSync(savePath, req.file.buffer)
            let modify = {path:`/uploads/${dateFolder}/${folder}/`}
            return res.json({res:true, modify})
        }
        else return res.status(500).json({res:false,error:'Данный файл уже присутствует'})
    }

    else{ //если это не первый кусок файла
        fs.appendFileSync(savePath, req.file.buffer)

        let index = uploads[folder].findIndex(el => el.filename === filename)
        let item = uploads[folder][index]
        item.part = part


        if(item.part === item.parts){ //если это последняя часть
            uploads[folder].splice(index,1) //удалить из загружаемых
            if(uploads[folder].length === 0) //проверить грузятся ли еще файлы в эту папку
                delete uploads[folder] //если нет то удалить
        }

        return res.json({res:true})
    }
    //createWriteStream
})

function bodyParser(body){
    let {start, name, ext, folder, parts, part} = body
    let filename = `${name}.${ext}`
    let timestamp = Number(folder.split('-')[0])
    let dateFolder = getDate(timestamp)

    let savePath = path.join(__dirname,'..','uploads',dateFolder,folder,filename)

    if (!fs.existsSync(path.join(__dirname,'..','uploads',dateFolder)))
        fs.mkdirSync(path.join(__dirname,'..','uploads',dateFolder));

    if (!fs.existsSync(path.join(__dirname,'..','uploads',dateFolder,folder)))
        fs.mkdirSync(path.join(__dirname,'..','uploads',dateFolder,folder));

    return {start, dateFolder, folder, filename, parts, part, savePath}
}

function checkUploadFile(folder, filename) {
    return uploads[folder].findIndex(el => el.filename === filename)
}

function getDate(timestamp){
    let date = new Date(timestamp)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${year}-${month > 9 ? month : '0'+month}-${day > 9 ? day : '0'+day}`
}


module.exports = router


