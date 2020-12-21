import * as authApi from "../api/auth"
import * as userApi from "../api/user"
import * as Tokens from '../untils/tokens';

let autoLoginResolver;
let autoLoginPromise = new Promise(resolve => { autoLoginResolver = resolve });

export default {
    namespaced: true,
    state:{
        user:null,
    },
    getters:{
        user: state => state.user,
        ready: () => autoLoginPromise,
        isLogin: state => state.user !== null,
        isContacts : state => state.user.contacts && Object.values(state.user.contacts).some(el => el),
        checkRole: state => allowedRoles => state.user !== null && allowedRoles.some(role => state.user.role === role)
    },
    mutations:{
        setUser (state, payload){
            state.user = payload
        }
    },
    actions:{

        async authUser({state, getters, commit}, {login, password}){
            let { ok, data } = await authApi.login(login, password);
            if(ok && data){
                Tokens.setTokens(data.at);
                let {user} = Tokens.getJWTPayload(data.at);
                commit('setUser', user);
            }
        },

        async isAuth({commit, dispatch}){
            let { ok, data } = await authApi.check();

            if(ok && data.res){
                let { user } = Tokens.getJWTPayload(Tokens.getAccessToken());
                commit('setUser', user);
            }
            else{
                dispatch('cleanUser');
            }

            autoLoginResolver();
        },
        async logout({ commit, dispatch }){
            let { ok, data } = await authApi.logout();

            if(ok && data.res){
                dispatch('cleanUser');
            }
        },
        async cleanUser({ commit }){
            commit('setUser', null);
            Tokens.cleanTokensData();
        },



        async changeContacts({state,commit, dispatch},contacts){
            let { ok, data } = await userApi.changeContacts({user_id:state.user.id, contacts});
            if(ok){

                dispatch('alerts/add', {text:'Информация успешно изменена', timeout:2000,type:'success'}, {root:true})
                let answer = await authApi.refresh()

                if(answer.res){
                    Tokens.setTokens( answer.at);
                    let {user} = Tokens.getJWTPayload( answer.at);
                    commit('setUser', user);
                }
            }
        },

        async returnUser({},id){
            let { ok,  data} = await userApi.geyById(id)
            if(ok){
                return data
            }
        }

    },
}