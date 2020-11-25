<template>
    <div id="nav">
        <div class="nav-wrapper">

            <router-link to="/" tag="div" class="app-name">
                <img :src="logo" alt="">
                <span>{{name}}</span>
            </router-link>
            <ul class="menu-items">
                <template v-if="isLogin">

                    <router-link tag="li" class="menu-item" :to="{name:'Home'}">Главная</router-link>

                    <li @click.prevent="openProfile" class="menu-item" :class="{'press':showProfile}">
                            <span>Профиль</span>
                            <svg class="arrow" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0.56L0.413 0H11.607L12 0.54L6.373 6H5.546L0 0.56Z" fill="white"/>
                            </svg>
                        <div v-if="showProfile" class="profile">
                            <div class="fio">{{user.sso_data.fam}} {{user.sso_data.name}} {{user.sso_data.ot}}</div>
                            <div class="hr"></div>
                            <div class="profile-content">
                                <ul class="profile-content-menu" @click.stop="closeProfile($event, true)">
                                    <router-link tag="li"  :to="{name:'profile_files'}">
                                        <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M38.7612 12.5335L26.7522 0.524554C26.4174 0.189732 25.9654 0 25.4911 0H1.78571C0.797991 0 0 0.797991 0 1.78571V48.2143C0 49.202 0.797991 50 1.78571 50H37.5C38.4877 50 39.2857 49.202 39.2857 48.2143V13.8002C39.2857 13.3259 39.096 12.8683 38.7612 12.5335ZM35.1674 14.6205H24.6652V4.1183L35.1674 14.6205ZM35.2679 45.9821H4.01786V4.01786H20.8705V16.0714C20.8705 16.693 21.1175 17.2892 21.557 17.7287C21.9965 18.1682 22.5927 18.4152 23.2143 18.4152H35.2679V45.9821Z" fill="#635BD6"/>
                                        </svg>
                                        <div>Загруженные файлы</div>
                                    </router-link>
                                    <router-link tag="li"  :to="{name:'profile_change'}">
                                        <svg width="41" height="51" viewBox="0 0 41 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23.7582 5.41667L35.8332 17.4917V45.4167H5.83325V5.41667H23.7582ZM25.8332 0.416672H5.83325C3.08325 0.416672 0.833252 2.66667 0.833252 5.41667V45.4167C0.833252 48.1667 3.08325 50.4167 5.83325 50.4167H35.8332C38.5832 50.4167 40.8332 48.1667 40.8332 45.4167V15.4167L25.8332 0.416672ZM20.8332 30.4167C23.5832 30.4167 25.8332 28.1667 25.8332 25.4167C25.8332 22.6667 23.5832 20.4167 20.8332 20.4167C18.0832 20.4167 15.8332 22.6667 15.8332 25.4167C15.8332 28.1667 18.0832 30.4167 20.8332 30.4167ZM30.8332 38.9917C30.8332 36.9667 29.6332 35.1667 27.7832 34.3667C25.5911 33.4099 23.2251 32.9161 20.8332 32.9161C18.4414 32.9161 16.0754 33.4099 13.8833 34.3667C12.9775 34.7538 12.2056 35.3986 11.6633 36.2209C11.121 37.0432 10.8324 38.0067 10.8333 38.9917V40.4167H30.8332V38.9917Z" fill="#76C880"/>
                                        </svg>
                                        <div>Изменить профиль</div>
                                    </router-link>
                                </ul>
                            </div>
                            <div class="logout"><a @click.prevent="logout" href="#">Выйти</a></div>
                        </div>
                    </li>
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
        data:() => ({
            showProfile:false,
        }),
        computed:{
            ...mapGetters('user',['isLogin','user','checkRole'])
        },
        methods:{
            openProfile(){
                if(!this.showProfile){
                    this.showProfile = true
                    setTimeout(()=>{
                        globalThis.addEventListener('click', this.closeProfile)
                    },0)
                }
            },
            closeProfile(e, push = false){
                if((this.showProfile && !e.target.closest('.profile')) || push){
                    this.showProfile = false
                    globalThis.removeEventListener('click', this.closeProfile)
                }
            },
            logout(){
                this.$store.dispatch('user/logout').then(() => {
                    this.$router.push({ name: 'login' });
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    $backGroundColor:#605CA6;
    .profile{
        @include xs-block(){
          top:70px;
          left:0;
          right:0;
        }
        color: rgba(146, 135, 146, 0.8);
        background: #FFFFFF;
        box-shadow: 0px 1px 25px rgba(0, 0, 0, 0.2);
        position: absolute;
        top:70px;
        right: 0;
        width: 300px;
        z-index: 2;
        .fio{
            padding: 10px;
            text-align: center;
            font-size: 1.1rem;
        }
        .hr{
            height:1px;
            background-color: #C4C4C4;
        }
        .profile-content{
            padding: 10px;
            .profile-content-menu{

                display: flex;
                margin:10px;
                padding:0;
                list-style-type: none;
                text-align: center;
                li{
                    cursor: pointer;
                    color: rgba(146, 135, 146, 0.8);
                    &:hover div{
                        color: #514AC0;
                    }

                }
            }
        }
        .logout{
            a{
                color: rgba(146, 135, 146, 0.8);
                padding: 10px 0;
                display: inline-block;
                width: 100%;
                text-align: center;
                text-display: none;
                &:hover{
                    background-color: #f2f2f2;
                }
            }
        }
    }
    #nav{
        position: relative;
        //height:60px;
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
          }
            .menu-item{
              @include xs-block(){
                position: static;
                width:50%;
              }
                position: relative;
                height: 100%;
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