const fs = require('fs');
const path = require('path');
const forEach = require('lodash/forEach')

const basePath = path.join(__dirname, '..','uploads')
const weekMs = 1000 * 60 * 60 * 24 * 7;
const systemFileName = "_filesInfo.json"

function garbageCollector() {
    fs.promises.readdir(basePath).then(directories =>{
        forEach(directories,dateFolderHandler)
    })
}

async function dateFolderHandler(directoryName){
    let currentTimeStamp = Date.now()
    let folderTimeStamp = new Date(directoryName).getTime()
    let differenceMs = currentTimeStamp - folderTimeStamp
    let folderPath = path.join(basePath,directoryName)

    if(differenceMs > weekMs){
        fs.promises.readdir(folderPath).then(directories =>{
            directories.length > 0
                ? forEach(directories,directory=>userFolderHandler(directory,folderPath))
                : fs.promises.rmdir(folderPath)
        })
    }
}

async function userFolderHandler(directoryName,folderPath){
    folderPath = path.join(folderPath,directoryName)

    fs.promises.readdir(folderPath).then(files =>{
        if(!files.includes(systemFileName)){
            fs.promises.rmdir(folderPath,  { recursive: true })
        }

    })
}

//

const CronJob = require('cron').CronJob;
const job = new CronJob('0 0 0 * * *', function() {
    //console.log('You will see this message every day ' + new Date());
    garbageCollector()
}, null, true, 'Asia/Krasnoyarsk');

module.exports = job;






