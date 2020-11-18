import * as settingsApi from "../api/admin/settings"
import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        emails:[],
        users:[],
        oldUsers:{},
        usersCount:0,
    },
    getters: {
        emails:state => state.emails,
        users:state => state.users,
        usersCount:state => state.usersCount,
    },
    mutations: {
        setEmails(state, emails){
            state.emails = emails
        },
        setUsers(state, users){
            state.users = users.map(el => ({
                id:el.id,
                login:el.sso_data.login,
                role:el.role,
                fio:`${el.sso_data.fam} ${el.sso_data.name} ${el.sso_data.ot}`,
            }))
            state.oldUsers={}
        },
        changeUserRole(state, {index, role}){
            let oldRole = state.users[index].role

            if(index in state.oldUsers){

                if(state.oldUsers[index] === role){
                    state.users[index].changed = false
                } else {
                    state.users[index].changed = true
                }
            } else{
                state.oldUsers[index]=oldRole
                state.users[index].changed = true
            }

            state.users[index].role = role

        },
        updateUser(state, index) {
            state.oldUsers = {}
            delete state.users[index].changed

            let users = [...state.users]
            state.users = []
            state.users = users
        },
        setUsersCount(state, count){
            state.usersCount = count
        }
    },
    actions: {
        async getEmails({commit}){
            let { ok, data } = await settingsApi.getEmails();
            if(ok && data){
                commit('setEmails',data)
            }
        },
        async saveEmails({commit, dispatch}, payload){
            let { ok, data } = await settingsApi.saveEmails(payload);
            if(ok && data){
                commit('setEmails',payload)
                dispatch('alerts/add', {text:'Сохранение прошло успешно', timeout:3000,type:'success'}, {root:true})
            }
        },
        async getUsers({commit}, page=1){
            let { ok, data } = await settingsApi.getUsers(page);
            if(ok && data){
                commit('setUsers', data)
            }
        },
        async getUsersSearch({commit}, {page, search}){
            let { ok, data } = await settingsApi.getUsersSearch({page, search});

            if(ok && data){
                commit('setUsers', data.users)
                commit('setUsersCount', data.count)
            }
        },
        async updateUser({state,commit,dispatch}, index){

            let user = {id:state.users[index].id, role:state.users[index].role}


            let { ok, data } = await settingsApi.updateUser(user);
            if(ok && data){
                commit('updateUser', index)
                dispatch('alerts/add', {text:'Сохранение прошло успешно', timeout:3000,type:'success'}, {root:true})

            }
        },
        async getUsersCount({commit}){
            let { ok, data } = await settingsApi.getUsersCount();
            if(ok && data){
                commit('setUsersCount', data.count)
            }
        },

    }
}
