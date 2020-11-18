import axios from 'axios';
import * as Tokens from './../untils/tokens';
import store from "../store";

const instance = axios.create({
    baseURL: '/',
    timeout: 10000
});

instance.interceptors.request.use(addAccessToken);

instance.interceptors.response.use(
    request => request,
    async error => {
        if(error.response.status !== 401){
            return Promise.reject(error); // это не ошибка доступа
        }

        let response
        try {
            response = await instance.get('auth/refresh');
        } catch (e) {
            return Promise.reject(error);
        }

        if(!response.data.res){
            return Promise.reject(error); // не было рефреш токена
        }


        Tokens.setTokens(response.data.at);
        let {user} = Tokens.getJWTPayload(response.data.at);
        store.commit('user/setUser',user)

        return axios(addAccessToken(error.config));
    }
);

export function addResponseHandler(onSuccess, onError){
    instance.interceptors.response.use(onSuccess, onError);
}

export default instance;

function addAccessToken(request){
    let accessToken = Tokens.getAccessToken();

    if(accessToken !== null){
        request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
}