import Vue from 'vue'
import Vuex from 'vuex'

import user from "./user";
import order from "./order";
import alerts from "./alerts";
import messages from "./messages";
import files from "./files";
import guides from "./guides";
import settings from "./settings";

Vue.use(Vuex)

import { addResponseHandler } from '../api/http';



const store = new Vuex.Store({
  modules: {user,order,alerts,messages,files,guides,settings}
});

addResponseHandler(
    response => {
      if('errorSuppression' in response.config && response.status === 200){
        response.data = { ok: true, data: response.data };
      }

      return response;
    },
    error => {

      if(error.response.status === 401 && error.config.silence401 !== true){
        //await
        store.dispatch('user/cleanUser');
        if(router.app.$route.name !== 'login') router.app.$router.push('/login')
        //router.push({ name: 'login' })
      }



      if(!('errorSuppression' in error.config)){
        return Promise.reject(error);
      }

      let es = error.config.errorSuppression;


      if('exclude' in es && es.exclude.includes(error.response.status)){
        return Promise.reject(error);
      }

      if('text' in es){
        let alert = { text: `Ошибка ответа от сервера ${es.text}` };

        if('critical' in es){
          alert.text += ' Рекомендуем перезагрузить страницу!';
        }

        if(error.response.data.error)  alert.text += `\n(${error.response.data.error})`;
        alert.type = 'error'

        //commit('setNotification',{type:'error', msg:e.message}, {root:true})
        store.dispatch('alerts/add', alert);
      }

      return { data: { ok: false } };
    }
);
export default store