<template>
    <div class="contact-us-wrapper">
        <div v-if="modal" @click="modal=false" class="contact-us-form-background"></div>
        <div v-if="modal" class="contact-us-form">

            <div class="contact-us-form-header">
                <span class="title">Написать сообщение </span>
                <span class="close" @click="modal=false">&#10006;</span>
            </div>

            <div class="contact-us-form-body">
                <form @submit.prevent="formHandler" class="contact-us-box" autocomplete="off">
                    <input v-model="theme" placeholder="Тема" type="text" id="theme"/>
                    <textarea v-model="text" placeholder="Сообщение" name="message" id="message" cols="30" rows="10"></textarea>
                    <button type="submit" :disabled="!valid" id="submit">Отправить</button>
                </form>
            </div>
        </div>

        <div class="contact-us" @click="modal=true">
            <div class="contact-us-icon">
                <svg><use :xlink:href="svgSprite + '#contact-us'"></use></svg>
            </div>
            <div class="contact-us-title">Отправить сообщение</div>
        </div>
    </div>
</template>

<script>
    import svgSprite from '../../assets/sprite.svg'
    export default {
        name: "ContactUd",
        data:()=>({
            theme:'',
            text:'',
            modal:false,
            svgSprite
        }),
        computed:{
          valid(){
              return this.theme !== '' && this.text !== ''
          }
        },
        methods:{
            formHandler(){
                this.$store.dispatch('messages/add',
                    {theme:this.theme,text:this.text, user_id:this.$store.getters['user/user'].id})
                this.modal=false
                this.theme = ''
                this.text = ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .contact-us-form-background{
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
    .contact-us-form{
        z-index: 6;
        background-color: #fff;
        position: absolute;
        top:20%;
        left:50%;
        transform: translateX(-50%);
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
        text-align: left;

        &-header{
            display: flex;
            justify-content: space-between;
            background-color: #635BD6;
            color: rgba(255, 255, 255, 0.8);
            padding: 10px 15px;
            .close{
                cursor: pointer;
            }
        }

        &-body{
            .contact-us-box{
                display: flex;
                flex-direction: column;
                padding: 20px;

                input,textarea{
                    outline: none;
                    display: block;
                    width: 100%;
                    margin: 0 0 20px;
                    padding: 10px 15px;
                    border: 1px solid #ccc;
                    color: #505050;
                    box-sizing: border-box;
                    font-size: 14px;
                    transition: 0.2s linear;
                }
                textarea{
                    font-family: 'Roboto', sans-serif;
                }
                button{

                    cursor: pointer;
                    background: #635BD6;
                    width: 100%;
                    padding: 10px 15px;
                    border: 0;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 400;
                    &:disabled{
                        background-color: #cacaca;
                    }

                }
            }
        }
    }

    .contact-us-wrapper{
        margin-top:20px;
        text-align: right;
        @include sm-block(){
          text-align: center;
        }
        .contact-us{
            color: rgba(255, 255, 255, 0.8);

            background-color: #635BD6;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            height: 40px;
            &:hover{
                background-color: #514AC0;
            }
            .contact-us-title{
                padding: 0 10px;
            }
            .contact-us-icon{
                display: flex;

                align-items: center;
                height: 40px;
                padding: 0 5px;
                background-color: #514AC0;
                svg{
                    fill: #fff;
                    width: 30px;
                    height: 30px;
                }
            }
        }
    }
</style>