import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'

Vue.config.productionTip = false
store.dispatch('user/isAuth');
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
