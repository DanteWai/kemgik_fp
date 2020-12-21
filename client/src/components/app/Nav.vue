<template>
    <div id="nav">
        <div class="nav-wrapper">

            <router-link to="/" tag="div" class="app-name">
                <img :src="logo" alt="">
                <span>{{name}}</span>
            </router-link>
            <ul class="menu-items">
                <template v-if="isLogin">
                   <router-link v-if="checkRole(['admin'])" tag="li" class="menu-item" :to="{name:'admin'}">Админка</router-link>
                    <router-link tag="li" class="menu-item" :to="{name:'Home'}">Главная</router-link>
                    <router-link tag="li" class="menu-item" :to="{name:'profile_files'}">Профиль</router-link>
                </template>
            </ul>

        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Nav",
        props:['name','logo'],
        computed:{
            ...mapGetters('user',['isLogin','user','checkRole'])
        },
    }
</script>

<style lang="scss" scoped>
    $backGroundColor:#605CA6;

    #nav{
        position: relative;
        min-height:60px;
        background-color: $backGroundColor;
        padding-left: 20px;
        padding-right: 20px;
        color:#fff;
      @include xs-block(){
        //height:70px;
        padding-left: 0;
        padding-right: 0;
      }

        .nav-wrapper{
            margin:0 auto;
            height: 100%;
            max-width: 1600px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          @include xs-block(){
            flex-direction: column;
          }
        }

        .app-name{
            display: flex;
            align-items: center;
            cursor: pointer;
            margin:5px;
            img{
                height: 20px;
                width: auto;
                margin-right: 5px;
            }
            span{
                font-size: 1.4rem;
            }
        }

        .menu-items{
            height: 100%;
            list-style-type: none;
            margin:0;
            padding:0;
            display: flex;
          @include xs-block(){
            flex-wrap:wrap;
            width: 100%;
            justify-content: center;
          }
            .menu-item{
              @include xs-block(){
                padding:10px 20px;
              }
                position: relative;
                //height: 100%;
                display: flex;
                align-items: center;
                color:#fff;
                padding:0 20px;
                cursor: pointer;
                &:hover{
                    background-color: darken($backGroundColor,9);
                }
               &.press{
                    background-color: darken($backGroundColor,9);
                }

            }
        }
        .arrow{
            margin-left:5px;
            vertical-align: middle;
        }
    }

</style>