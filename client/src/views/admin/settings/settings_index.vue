<template>
    <div class="row">
        <div class="col-2 left-menu-classic">

            <router-link active-class="active" :to="{name:'admin_settings_users'}" class="left-menu-classic-elem">Пользователи</router-link>
            <router-link active-class="active" :to="{name:'admin_settings_emails'}" class="left-menu-classic-elem">Emails</router-link>
        </div>
        <div class="col-10 content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style lang="scss" scoped>
    .row{
        @include row-flex();
        .col-2{
            @include col();
            @include size(2);
        }
        .col-10{
            @include col();
            @include size(10);
        }
    }

    .left-menu-classic{
        background-color: #fff;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
        &-elem{
            color:#333;
            text-decoration: none;
            display: inline-block;
            width: 100%;
            padding: 15px 20px;
            border-left:2px solid #fff;
            border-bottom: 1px solid #f5f5f5;
            &:last-child{
                border-bottom: none;
            }

            &.active{
                border-left-color: #3b5aa2;
                color: #3b5aa2;
            }
            &:hover{
                border-left-color: #a1b9f0;
            }
        }
    }
</style>