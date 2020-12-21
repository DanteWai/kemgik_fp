<template>
  <div id="app">
    <v-nav :logo="require('./assets/logo.svg')" :name="'FilePlatform'"></v-nav>

    <v-alerts v-if="$store.getters['alerts/isAlerts']"></v-alerts>

    <div id="content">
      <router-view/>
    </div>



    <div id="footer">
      <div>© KemGIK FileUploader 2020 <sup>v. 1.0.6</sup></div>
      <div><a target="_blank" href="http://kemguki.ru/">Официальный сайт КемГИК</a></div>
      <div>Разработка сайта: Сафронов Д.А.<br>aa502@yandex.ru</div>
    </div>

    <!--
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>

    -->
  </div>
</template>

<script>

  import Nav from "./components/app/Nav";
  import Alerts from "./components/Alerts";
  import {mapGetters} from "vuex";

  export default  {
    components:{
      'v-nav': Nav,
      'v-alerts':Alerts

    },
    data: () => ({

    }),
    computed:{
      ...mapGetters('user',['checkRole'])
    },
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  :root {
    box-sizing: border-box;
  }

  *,
  ::before,
  ::after {
    box-sizing: inherit;
  }

  html{
    font-family: 'Roboto', sans-serif;
  }
  body{
    background-color: #EEEEEE;
    margin:0;
    padding:0;
  }
  a{
    color:#605ca6;
  }
  p{
    margin: 10px 0 0;
  }
  ul {
    margin:5px 0 0;
  }
  #app{
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
  }
  .h1-header{
    color: #8c8c8c;
    font-weight: 400;
    font-size: 1.6rem;
    @include sm-block(){
      font-size: 1.2rem;
    }
  }

  .flex{display: flex}

  .m10{ margin:10px;}
  .mt10{ margin-top:10px;}
  .mb10{ margin-bottom:10px;}

  .w100{width: 100%;}

  #footer{
    background: #434343 linear-gradient(#333, #434343);
    padding:20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size:0.9rem;
    color:#f2f2f2;
    >div{
      text-align:center;
    }
    sup{
      font-size:0.7rem;
    }
    a{
      color:#f2f2f2;
      &:hover{
        text-decoration:none;
      }
    }
    @include sm-block(){
      flex-direction: column;
      padding:10px 20px;
    }
  }

</style>
