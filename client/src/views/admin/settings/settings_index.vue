<template>
    <div class="row">
        <div class="col-2 left-menu-classic">

            <router-link active-class="active" :to="{name:'admin_settings_users'}" class="left-menu-classic-elem">Пользователи</router-link>
            <router-link active-class="active" :to="{name:'admin_settings_emails'}" class="left-menu-classic-elem">Emails</router-link>
            <router-link active-class="active" :to="{name:'admin_settings_sql'}" class="left-menu-classic-elem">SQL</router-link>
        </div>
        <div class="col-10 content">
            <router-view></router-view>
        </div>
        <div class="footer">
          <p>Свободное место на диске:{{freeMemory + ' Гб'}}</p>
        </div>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "index",
        computed:{
          ...mapGetters('settings',['freeMemory'])
        },
        created(){
          this.$store.dispatch('settings/getFreeMemory')
        }
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
      .footer{
        font-size:0.9rem;
        @include col();
        @include size(12);
        color:#333;
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