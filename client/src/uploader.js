import axios from 'axios'

export default class Uploader {
    constructor({file, abstractFile, user_id, timestamp}) {
        this.file = file;
        this.abstractFile = abstractFile;

        this.user_id = user_id

        this.start = 0
        this.size = this.file.size;
        this.sliceSize = 10000000;
        this.uploadedParts = 0
        this.timestamp = timestamp


        this.parts =  Math.ceil (this.size / this.sliceSize)

        this.init()
    }

    init(){
        this.abstractFile.deleteFromServer = this.deleteFile()
    }
    async upload() {

         this.start = this.uploadedParts * this.sliceSize
         this.end = ((this.uploadedParts + 1) * this.sliceSize)
         if(this.end >= this.size) this.end = this.size



         let formData = this.getFormData()

         const CancelToken = axios.CancelToken;
         const source = CancelToken.source();
         this.abstractFile.cancelUpload = source



        let {data} = await axios.post('/api/files/upload', formData,{
            onUploadProgress: progressEvent => {
                let fullBytes = (this.uploadedParts * this.sliceSize) + progressEvent.loaded
                let upload = fullBytes / (this.size/100)
                upload = upload.toFixed(0)
                if(upload > 100) upload = 100
                this.abstractFile.uploadProgress = upload
            },
            cancelToken: source.token
        })

        if(data.modify){
            this.abstractFile.path = data.modify.path
        }

        this.uploadedParts += 1

        if(this.uploadedParts < this.parts) {
            await this.upload()
        } else {
            this.abstractFile.uploaded = true
            this.abstractFile.uploadProgress = 100
        }
    }

    deleteFile(){
        return async () =>{
            let formData = this.getFormData()
            let {data} = await axios.post('/api/files/upload_delete', formData)
            return data.res
        }
    }


    slice(file, start, end) {
        let slice = file.mozSlice ? file.mozSlice :
            file.webkitSlice ? file.webkitSlice :
                file.slice ? file.slice : this.noop;

        return slice.bind(file)(start, end);
    }

    noop() {
        console.log('noop')
    }

    getFormData(){
        let piece = this.slice(this.file, this.start, this.end)
        let formData = new FormData();

        formData.append('start', this.start);
        formData.append('folder', `${this.timestamp}-${this.user_id}`);
        formData.append('ext', this.abstractFile.ext);
        formData.append('name', this.abstractFile.name);
        formData.append('parts', String(this.parts));
        formData.append('part', String(this.uploadedParts+1));
        formData.append('file', piece);

        return formData;
    }
}
