<template>
    <div  class="select" :class="view">
        <div v-if="label" class="label">{{label}}</div>
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
        props:{
          startValue:String,
          label:String,
          items:Object,
          view:{
            type:String,
            default:'flat'
          }
        },
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
    }

    .label{
      color:#605ca6;
      font-size:0.75rem;
      margin-bottom:1px;
      position: absolute;
      left:10px;
      transform: translateY(-50%);
      background:#fff;
      padding:0 3px;
    }

    .flat{
      .select-title{
        border:1px solid #605ca6;
        display: inline-block;
        padding: 5px 15px;
        color:#f2f2f2;
        background-color: #605ca6;
        cursor: pointer;
        &:hover{
          background-color: darken(#605ca6,10);
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

    .outline{
      .select-title{
        border:1px solid #605ca6;
        display: inline-block;
        padding: 10px 30px;
        color:#605ca6;
        cursor: pointer;
        &:hover{
          border-color: darken(#605ca6,10);
          color: darken(#605ca6,10);
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