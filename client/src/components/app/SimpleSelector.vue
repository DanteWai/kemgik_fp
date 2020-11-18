<template>
    <div  class="select">
        <div class="select-title" @click="openSelector">
            {{text}}
        </div>
        <div v-if="show" class="select-options">
            <div class="select-option" v-for="(item, key) in items"
                 :key="key"
                 @click="optionClick(item,key)"
            >
                {{item}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SimpleSelector",
        props:['startValue', 'items'],
        data:()=>({
            text:'Выбрать',
            value:null,
            show:false,
            isEvent:false
        }),
        methods:{
            optionClick(item,key){
                if(this.value !== key){
                    this.$emit('changeValue', key)
                }
                this.text = item
                this.value = key
                //this.show = false
            },
            openSelector(){
                this.show=true

                if(!this.isEvent){
                    this.isEvent = true
                    setTimeout( () => {
                        globalThis.addEventListener('click', this.closeSelector)
                    },0)
                }

            },
            closeSelector(e){
                this.show=false
                globalThis.removeEventListener('click',this.closeSelector)
                this.isEvent = false
            }
        },

        created() {
            this.text = this.startValue
        }
    }
</script>

<style lang="scss" scoped>
    .select{
        position: relative;
        .select-title{
            border:1px solid #f2f2f2;
            display: inline-block;
            padding: 5px 15px;
            color:#f2f2f2;
            background-color: #1c588c;
            cursor: pointer;
            &:hover{
                background-color: darken(#1c588c,10);
            }
        }
        .select-options{
            position: absolute;

            color:#666;
            border:1px solid #f2f2f2;
            border-bottom: none;
            background-color: #fff;
            z-index: 1;
            .select-option{
                padding: 5px 15px;
                border-bottom: 1px solid #f2f2f2;
                cursor: pointer;
                &:hover{
                    color:#1c588c;
                }
            }
        }
    }
</style>