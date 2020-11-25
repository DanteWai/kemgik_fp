<template>
    <!--Сообщение о необходимости заполнить контактные данные после отправки файлов-->
    <div class="cc-wrapper">
        <div class="cc-body">
            <div class="cc-body-text">
                <slot name="text"></slot>
            </div>
            <div class="cc-body-buttons">
                <button @click="linkHandler" class="cc-link" >Заполнить</button>
                <button @click="$emit('input', false)">Закрыть</button>
            </div>
        </div>
    </div>


</template>

<script>
    //
    export default {
        name: "ContactValidate",
        methods:{
            linkHandler(){
                this.$emit('input', false)
                this.$router.push({name:'profile_change'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cc-wrapper{
        position: fixed;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
    }
    .cc-body{
        position: fixed;
        top:30%;
        left:50%;
        transform: translateX(-50%);
        background-color: #fff;
        padding: 20px;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.3);
        border-radius: 15px;

        p{
          color: #333;
          margin:10px 0;
        }

        .cc-body-buttons{
          margin-top:20px;
            button{
                border:none;
                padding: 10px 25px;
                font-size: 1rem;
                font-weight:300;
                cursor: pointer;
                background-color: #fff;
                color: #333;
            }
            .cc-link{
              border-radius:5px;
                background-color: #5F2EEA;
                color:#fff;
                margin-right: 10px;
                &:hover{
                    background-color: darken(#5F2EEA, 10);
                }
            }

        }
    }
</style>