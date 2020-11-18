<template>
    <div class="content-wrapper">
        <div class="admin-menu">
            <router-link active-class="a-active" :to="{name:'admin_orders'}" >Заявки</router-link>
            <router-link active-class="a-active" :to="{name:'admin_messages'}" >Сообщения</router-link>
            <router-link active-class="a-active" :to="{name:'admin_guides'}" class="split">Гайды</router-link>
            <router-link active-class="a-active" :to="{name:'admin_settings'}">Настройки</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "admin_index"
    }
</script>

<style lang="scss">
    .admin-menu{
        margin-bottom: 20px;
        display: flex;
        background-color: #fff;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);

        .split{
            margin-right: auto;
        }
        a{
            text-decoration: none;
            display: inline-block;
            color:#333;
            padding: 15px 20px;
            transition: 0.2s;
            border-bottom:2px solid #fff;
            &:hover{
                border-bottom-color: #a1b9f0;
            }
        }
        a + a{
            border-left: 1px solid #f5f5f5;
        }
        a.a-active{
            border-bottom-color: #3b5aa2;
            color: #3b5aa2;
        }
    }

    .admin-content-desc{
        color: #5e6d91;
        margin-top: -20px;
    }

    .back_admin_button{
        text-decoration: none;
        color:#868686;
        margin-left:10px;
        margin-top:-10px;
        margin-bottom:10px;
        &:hover{
            color:#333;
        }
    }

    .admin_button {
        background: #333;
        border:none;
        color: #FFFFFF;
        text-transform: uppercase;
        text-decoration: none;
        padding: 12px 24px;
        font-size: 0.95rem;
        cursor:pointer;
        display: inline-block;
        &:hover{ background: darken(#333, 10); }
        &:disabled{ background:#bbb; }

        &.save{
            background-color: #76C880;
            &:hover{ background-color: darken(#76C880, 10); }
        }
        &.delete{
            background-color: #C87676;
            &:hover{ background-color: darken(#C87676,10); }
        }
    }






</style>