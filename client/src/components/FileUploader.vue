<template>
        <div class="dropzone"
             :class="{go_click:fileZoneMouseClick === 1,go_drop:fileZoneMouseDrop > 0}"
             @dragover.prevent
             @dragenter="dragenter"
             @dragleave="dragleave"
             @drop="ondrop"
        >


            <div class="file-zone">
                <button type="button" class="clearAll" @click="clearAll">Очистить всё</button>
                <!--
                <div v-if="currentEditFile" class="edit-name">
                    <label for="filename">Изменить имя файла</label>
                    <textarea resize="none" id="filename" v-model="currentEditFileName"></textarea>
                    <button @click="editNameSave">Сохранить</button>
                </div>
                -->
                <div v-for="(file, index) in abstractFiles" :key="file.id"
                     class="file-zone_item"
                     @dragstart.prevent
                     @mousedown="mousedown_f(file)"
                     @mouseup="mouseup_f"
                     @mouseover="mouseover_f(file, $event)"
                     @mouseout="mouseout_f"
                     :class="{draggable: file.draggable, droppable: file.droppable}"
                >


                    <span v-if="file.droppable" class="change-position">Поменять местами</span>
                    <span class="delete-item" @click="deleteItem(file, index, $event)">&#10006;</span>
                    <div class="file-zone_item-image">
                        <template v-if="!file.isImage">
                            <img :src="fileIcon" :alt="file.name">
                            <span v-if="file.ext" class="image-ext">{{file.ext}}</span>
                        </template>
                        <img v-else :src="file.imageUrl" :alt="file.name">
                    </div>
                    <div class="progress">

                    </div>
                    <div class="loading-bar">
                        <span class="progress-bar-count">{{file.uploadProgress}}</span>
                        <div class="progress-bar" :style="{width:file.uploadProgress +'%'}"></div>
                    </div>
                    <div class="file-zone_item-name">{{file.name}}</div>
                    <div class="file-zone_item-footer">
                        <div v-if="index" class="footer-icon" @click="offsetEl(index, index-1)">
                            <svg><use :xlink:href="svgSprite + '#left-arrow'"></use></svg>
                        </div>
                        <div v-if="index+1 !== abstractFiles.length" class="footer-icon" @click="offsetEl(index, index+1)">
                            <svg><use :xlink:href="svgSprite + '#right-arrow'"></use></svg>
                        </div>
                        <div v-if="false" class="footer-icon edit">
                            <svg><use :xlink:href="svgSprite + '#edit'"></use></svg>
                        </div>
                    </div>


                </div>
            </div>

            <div class="call-to-action"
                 @click="fileClick"
                 @mouseover="actionMouseOver"
                 @mouseout="actionMouseOut"
            >
                <div class="call-to-action-wrapper">
                    <svg v-if="fileZoneMouseClick===1" class="call-to-action-file_icon"><use :xlink:href="svgSprite + '#go_click'"></use></svg>
                    <svg v-else-if="fileZoneMouseDrop > 0" class="call-to-action-file_icon"><use :xlink:href="svgSprite + '#dropbox'"></use></svg>
                    <svg v-else class="call-to-action-file_icon"><use :xlink:href="svgSprite + '#file-icon'"></use></svg>
                    <span>Перетащите файлы(папки) сюда<br> или кликните по области</span>
                </div>
            </div>
            <div class="call-to-action-folder" @click="folderClick">
                <span>Выбрать папку</span>
            </div>

            <input ref="folder" webkitdirectory directory mozdirectory multiple @change="changeFileInput" type="file" class="input-field" />
            <input ref="files"  multiple @change="changeFileInput" type="file" class="input-field"/>



        </div>
</template>

<script>
    import fileIcon from './../assets/flat-color-icons_file.svg'
    import svgSprite from './../assets/sprite.svg'
    import {mapActions, mapGetters, mapMutations} from 'vuex'

    export default {
        data: () => ({

            // секция для реалезации переносов файлов внутри dpopzone
            currentDraggable:null,
            currentDroppable:null,
            //
            fileZoneMouseClick:0,
            fileZoneMouseDrop:0,

            fileIcon:fileIcon, //стандартная иконка для файла
            svgSprite,

        }),
        computed:{
            ...mapGetters('files',['abstractFiles'])

        },
        watch:{

        },
        methods:{
            ...mapActions('files',['pushFile']),
            ...mapMutations('files',['deleteFile','deleteFileById']),
            dragenter(e){
                e.preventDefault()
                this.fileZoneMouseDrop++
            },
            dragleave(e){
                e.preventDefault()
                this.fileZoneMouseDrop--
            },
            actionMouseOver(){
                this.fileZoneMouseClick = 1
            },
            actionMouseOut(){
                this.fileZoneMouseClick = 0
            },

            fileClick(){
                this.$refs.files.click()
            },
            folderClick(){
                this.$refs.folder.click()
            },

            ondrop(e){
                e.preventDefault()
                e.stopPropagation()

                let items = Array.from(e.dataTransfer.items).filter(item => item.kind === 'file')
                if (items.length === 0) console.log('Нет подходящих элементов')

                for(let i=0; i < items.length;i++){
                    let item = items[i]

                    //если подерживается webkitGetAsEntry
                    if(typeof item.webkitGetAsEntry === 'function'){
                        item = item.webkitGetAsEntry();
                        this.scanWFile(item)
                    }
                    //загрузка файлов обычными способами
                    else {
                        console.log('simple api')
                        let files = e.dataTransfer.files
                        for(let i=0; i < files.length;i++){
                            if (!files[i].type && files[i].size%4096 == 0) {
                                console.log('it is folder')
                            } else {
                                this.pushFile({file:files[i]})
                            }
                        }

                    }

                }
                this.fileZoneMouseDrop = 0
            },
            scanWFile(item, folderName){
                if(item.isDirectory){
                    let directoryReader = item.createReader();
                    directoryReader.readEntries((entries) => {
                        entries.forEach((file) => { this.scanWFile(file, item.name) });
                    });
                }

                if(item.isFile){
                    item.file((file) =>{ this.pushFile({file, folderName}) }, (err)=>{ console.log(err) })
                }
            },
            changeFileInput(e){
                //Для файловых инпутов
                let files = e.target.files
                for(let i=0; i < files.length;i++){
                    this.pushFile({file:files[i]})
                }
            },

            deleteItem(item, index, e){
                e.stopPropagation()
                if(!item.uploaded){
                    item.cancelUpload.cancel('Запрос на загрузку файла отменён')
                }
                item.deleteFromServer().then(() => {this.deleteFile(index)})

            },
            clearAll(){
              this.abstractFiles.forEach((item,index) =>{
                if(!item.uploaded){
                  item.cancelUpload.cancel('Запрос на загрузку файла отменён')
                }
                item.deleteFromServer().then(() => {this.deleteFileById(item.id)})
              })
                console.log('clear all')

            },

            clear(){

                this.currentDraggable = null
                this.currentDroppable = null
            },


            // секция для реалезации переносов файлов внутри dpopzone

            mousedown_f(item){
                item.draggable = true
                this.currentDraggable = item

                document.addEventListener('mouseup',this.mouseup_f);
            },
            mouseup_f(){
                if(this.currentDraggable !== null && this.currentDroppable !==null){
                    let index1 = this.abstractFiles.findIndex(el => el.id === this.currentDraggable.id)
                    let index2 = this.abstractFiles.findIndex(el => el.id === this.currentDroppable.id)
                    this.abstractFiles[index1] = this.currentDroppable
                    this.abstractFiles[index2] = this.currentDraggable
                }
                if(this.currentDraggable !== null){
                    this.currentDraggable.draggable = false
                    this.currentDraggable = null
                }
                if(this.currentDroppable !==null){
                    this.currentDroppable.droppable = false
                    this.currentDroppable = null
                }

                document.removeEventListener('mouseup',this.mouseup_f);
            },
            mouseover_f(item,e){
                //console.log('over')
                if(this.currentDraggable !== null && this.currentDraggable !==item){
                    item.droppable = true
                    this.currentDroppable = item
                }

            },
            mouseout_f(e){
                //console.log('out')
                if(this.currentDroppable !== null){
                    this.currentDroppable.droppable = false
                    this.currentDroppable = null
                }
            },
            offsetEl(from, to){
                this.abstractFiles[from] = this.abstractFiles.splice(to, 1, this.abstractFiles[from])[0];
            },





        },
    }
</script>

<style lang="scss" >
    .dropzone{
        box-sizing: border-box;
        min-height: 200px;
        position: relative;
        padding: 15px;
        cursor: pointer;
        border:1px solid rgba(18, 18, 18, 0.2);
        //transition: 0.4s;
        display: flex;
        flex-direction: column;

        &.go_drop, &.go_click{
            border-color: rgb(111, 144, 221);
            .call-to-action{
                span{
                    color:rgb(111, 144, 221);
                }
                &-file_icon{
                    fill:rgb(111, 144, 221);

                }
            }
        }

        .call-to-action{
            min-height: 100px;
            text-align: center;
            width: 100%;
            flex:1;
            margin:0;
            &-wrapper{
                padding-top: 50px;
                padding-bottom: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            span{
                display: inline-block;
                color:rgba(33, 33, 33, 0.4);;
                font-size: 1.4rem;

            }
            &-file_icon{
                fill:#b9b9b9;
                width:60px;
                height:60px;
                margin-right: 10px;
            }
        }
        .call-to-action-folder{
            position: absolute;
            text-align: right;
            border-left: 1px solid rgba(18, 18, 18, 0.2);
            border-top:1px solid rgba(18, 18, 18, 0.2);
            z-index: 1;
            right: 0;
            bottom: 0;
            padding: 10px 40px;
            color:rgba(33, 33, 33, 0.4);
            &:hover{
                color:rgb(111, 144, 221);
                border-color: rgb(111, 144, 221);
                border-bottom:1px solid ;
                border-right:1px solid ;
                margin-bottom: -1px;
                margin-right: -1px;

            }
        }
        .input-field{
            opacity: 0;
            width:1px;
            height:1px;
            top:-1000px;
            left:-1000px;
            z-index: -100;
            position: absolute;
            cursor: pointer;
        }
    }


    .file-zone{
        cursor: default;
        @include row-flex();

        .clearAll{
            border:none;
            position: absolute;
            bottom:0;
            left:0;
            background-color: inherit;
            color: rgba(33, 33, 33, 0.4);
            cursor:pointer;
            padding: 5px 10px;

            &:hover{
                color:rgb(111, 144, 221);
            }
        }
        .edit-name{
            position: absolute;
            display: flex;
            flex-direction: column;
            min-width: 250px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            top:10%;
            left:50%;
            transform: translateX(-50%);
            z-index: 10;
            background-color: #fff;
            label{
                color:#828282;
                font-size: 0.8rem;
                margin-bottom: 3px;
            }
            textarea{
                resize: none;
                border: 1px solid rgba(18, 18, 18, 0.2);
                margin-bottom: 5px;
                height: 100px;
            }
            button{
                background: #76C880;
                border:none;
                padding: 8px;
                cursor: pointer;
                text-transform: uppercase;
                //font-weight: bold;
                color:#fff;
                letter-spacing: 1px;
                font-size: 0.7rem;
                &:hover{
                    background: darken(#76C880,10);
                }
            }
        }
        .file-zone_item{
            user-select: none;
            position: relative;
            cursor: pointer;
            @include col();
            @include size(2);

            margin-bottom: 20px;
            border-radius: 3px;
            border: 1px solid rgba(18, 18, 18, 0.2);
            padding: 5px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;

            .loading-bar{
                width:95%;
                height:24px;
                background:#dfe6e9;
                //border-radius:5px;
                margin: 0 auto;
                position: relative;

                .progress-bar {
                    height: 100%;
                    background: #a29bfe;
                    //border-radius: 5px;
                    border: 0 solid #0abde3;
                }
                .progress-bar-count{
                    position: absolute;
                    top:15%;
                    left:50%;
                    transform: translateX(-50%);
                    color:#3a3673;

                }
            }

            &.draggable{
                border-color: rgba(0, 99, 255, 0.43);
                background-color: #f0f7ff;
            }
            &.droppable{
                background-color: #f1fff0;
                border-color: rgba(56, 219, 11, 0.37);
            }

            .change-position{
                background-color: rgba(56, 219, 11, 0.37);
                position: absolute;
                text-align: center;
                top:0;
                left:0;
                font-size: 0.9rem;
                color:#484848;
                padding: 5px;
                z-index: 2;
            }


            &-name{
                padding: 5px;
                max-height: 30px;
                overflow: hidden;
                margin-bottom: 5px;
                font-size: 0.9rem;
            }
            &-image{
                padding: 10px;
                height: 100px;
                position: relative;
                //background-color: #f2f2f2;
                .image-ext{
                    position: absolute;
                    top:50%;
                    left:50%;
                    background-color: #333;
                    padding: 1px 10px;
                    color:#f2f2f2;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                }
                img{
                    height: 100%;
                    object-fit: contain;
                    width: 100%;

                }
            }
            &-footer{
                display: flex;
                margin-top: auto;
                .edit{
                    margin-left: auto;
                }
                svg {
                    fill:#cecbcb;
                    width: 24px;
                    height: 24px;
                    &:hover{
                        fill:#4969c8;
                    }
                }
            }
            .delete-item{
                position: absolute;
                right: 10px;
                top:5px;
                color:#cecbcb;
                &:hover{
                    color:#3e3e3e;
                }
                z-index: 1;
            }
        }



        /*
        @include lg-block(){};
        */
    }

</style>