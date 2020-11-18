<template>
    <div class="guides-list">
        <div v-if="haveShow" class="guide-list-wrapper"  @click="close()"></div>
        <div class="guide-list-element" v-for="guide in guides" :key="guide.id">
            <span @click="open(guide)">{{guide.name}}</span>
            <div v-if="guide.show"  class="guide-list-element-content">
                <p><b>{{guide.name}}</b></p>
                <p>{{guide.text}}</p>
                <button class="close" @click="close()">Закрыть</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuidesList",
        data:() => ({
            guides:[],
            haveShow:false,
            activeItem:{},
        }),
        methods:{
            open(item){
                if(!this.haveShow){
                    this.haveShow = true
                    item.show = true
                    this.activeItem = item
                }
            },
            close(){
                this.haveShow = false
                this.activeItem.show = false
                this.activeItem = {}
            }
        },
        created() {
            this.$store.dispatch('guides/getFullGuides').then(() => {
                this.guides = this.$store.getters['guides/guides'].map(el => ({...el, show:false}))
            })
        }
    }
</script>

<style scoped lang="scss">
    .guide-list-wrapper{
        background-color: rgba(0,0,0,0.4);
        position: fixed;
        top:0;
        left:0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 5;

    }
    .guides-list{
        display: flex;
        flex-wrap: wrap;
        margin-top:20px;
        margin-left: -10px;
        margin-right: -10px;
        justify-content: space-between;
    }
    .guide-list-element{
        margin:10px;
        box-shadow: 0px 1px 25px rgba(0, 0, 0, 0.1);


        span{
            text-align: center;
            background-color: #fff;
            cursor: pointer;
            color: #333;
            width: 100%;
            display: block;
            padding: 10px 20px;
            border-bottom: 2px solid #fff;
            &:hover{
                color: #635BD6;
                border-color: #635BD6;
            }
        }
    }
    .guide-list-element-content{
        z-index: 6;
        cursor: default;
        padding: 10px;
        text-align: left;
        position: fixed;
        top:20%;
        left:50%;
        transform: translateX(-50%);
        background-color: #fff;
        min-width: 400px;
        box-shadow: 0px 1px 25px rgba(0, 0, 0, 0.1);
        .close{
            border:none;
            background: none;
            color: #c4c4c4;
            font-weight: bold;
            cursor: pointer;
            padding: 0;
            &:hover{
                color:#333;
            }
        }
    }
</style>