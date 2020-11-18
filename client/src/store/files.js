import Uploader from "../uploader";
import mime from 'mime-types'

export default {
    namespaced: true,
    state: {
        files:[], //массив "официалньых" файлов
        abstractFiles:[], //массив с элементами на основе файлов хранящий данные для пользователя
        fileIndex:0, // инкремент для индентефикации файлов внутри системы
        timestamp:null,
    },
    getters: {
        files:state => state.files,
        abstractFiles:state => state.abstractFiles,
        timestamp:state => state.timestamp,
        filesValid: state => {
            if(state.abstractFiles.length === 0) return true
            else return state.abstractFiles.every(el => el.uploaded)
        }
    },
    mutations: {
        setTimestamp(state, timestamp){
            state.timestamp = timestamp
        },
        setFiles(state,{file,aFile}){
            state.files.push(file)
            state.abstractFiles.push(aFile)
        },
        filesClear(state){
            state.files = []
            state.abstractFiles = []
            state.fileIndex = 0
        },
        deleteFile(state,index){
            URL.revokeObjectURL(state.abstractFiles[index].imageUrl);
            state.files.splice(index,1)
            state.abstractFiles.splice(index,1)
        },
        deleteFileById(state,id){
            let index = state.abstractFiles.findIndex(abstractFile => abstractFile.id === id)
            URL.revokeObjectURL(state.abstractFiles[index].imageUrl);
            state.files.splice(index,1)
            state.abstractFiles.splice(index,1)
        },
        deleteFileAll(state){
            state.abstractFiles.forEach((item)=>{
                URL.revokeObjectURL(item.imageUrl);
            })

            state.files = []
            state.abstractFiles = []
        }
    },
    actions: {
        async pushFile({state, commit, dispatch, rootGetters},{file, folderName}){
            let oldFile = file

            //Если проблемы с типом файла то пробуем его установить
            if(oldFile.type === ''){
                let type = mime.lookup(file.name)
                oldFile = new File([file], file.name,{type:type || ''})
            }

            let id = ++state.fileIndex
            let ext = getExtension(file.name)
            let name = ext ? file.name.slice(0, file.name.lastIndexOf('.')) : file.name
            ext = ext ? ext.toLowerCase() : ext
            let isImage = isImageFn(file, ext)
            let imageUrl = isImage ? URL.createObjectURL(file) : ''
            let newFile = { id, ext, folder:folderName, name, isImage, imageUrl,
                uploaded:false, uploadProgress:0, draggable:false, droppable:false }

            oldFile['id'] = id


            commit('setFiles',{file:oldFile, aFile:newFile})


            let upload = new Uploader({
                file:oldFile,
                abstractFile:newFile,
                user_id:rootGetters['user/user'].id,
                timestamp:state.timestamp

            })
            try{
                await upload.upload()
            }
            catch(e){
                if(e.response && e.response.data && e.response.data.error){
                    dispatch('alerts/add', {text:e.response.data.error, timeout:2000,type:'error'}, {root:true})
                    let index = state.abstractFiles.indexOf(newFile)
                    if(index >= 0){
                        commit('deleteFile', index)
                    }


                } else {
                    console.log(e.message)
                    //dispatch('alerts/add', {text:e.message, timeout:2000,type:'error'}, {root:true})
                }
            }


        },
    }
}

function getExtension(filename){
    let re = /(?:\.([^.]+))?$/;
    return  re.exec(filename)[1];
}

function isImageFn(file){
    return Boolean(~file.type.indexOf('image/'))
}

/*
*
* async pushFile(oldFile, folderName){
                let file = oldFile

                if(file.type === ''){
                    let type = mime.lookup(file.name)
                    file = new File([file], file.name,{type:type || ''})
                }

                let id = ++this.fileIndex
                let ext = this.getExtension(file.name)
                let name = ext ? file.name.slice(0, file.name.lastIndexOf('.')) : file.name
                ext = ext ? ext.toLowerCase() : ext
                let isImage = this.isImage(file, ext)
                let imageUrl = isImage ? URL.createObjectURL(file) : ''
                let newFile = { id, ext, folder:folderName, name, isImage, imageUrl,
                    uploaded:false, uploadProgress:0, draggable:false, droppable:false }


                file['id'] = id
                this.files.push(file)
                this.abstractFiles.push(newFile)

                let upload = new Uploader({
                    file,
                    abstractFile:newFile,
                    user:this.$store.getters['user/user'],
                    timestamp:this.timestamp

                })
                await upload.upload()
            },*/