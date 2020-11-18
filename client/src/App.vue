<template>
  <div id="app">
    <v-nav :logo="require('./assets/logo.svg')" :name="'FilePlatform'"></v-nav>

    <v-alerts v-if="$store.getters['alerts/isAlerts']"></v-alerts>

    <div id="content">
      <router-view/>
    </div>



    <div id="footer">

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

  export default  {
    components:{
      'v-nav': Nav,
      'v-alerts':Alerts

    },
    data: () => ({

    }),
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
  #app{
    min-height: 100vh;
    display: grid;
    grid-template-rows: 60px 1fr 20px;
    grid-template-columns: 1fr;
  }
  .h1-header{
    color: #8c8c8c;
    font-weight: 400;
    font-size: 1.6rem;
  }

  .flex{display: flex}

  .m10{ margin:10px;}
  .mt10{ margin-top:10px;}
  .mb10{ margin-bottom:10px;}

  .w100{width: 100%;}

  #footer{
    background-color: #d9d9d9;
  }

</style>
