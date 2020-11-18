import * as messagesApi from "../api/messages";

export default {
    namespaced: true,
    state: {
        messages:[],
        messagesCount:0,
    },
    getters: {
        messages:state => state.messages,
        messagesCount:state => state.messagesCount,
    },
    mutations: {
        setMessages(state, messages){
            state.messages = messages
        },
        setMessagesCount(state, count){
            state.messagesCount = count
        }
    },
    actions: {
        async getMessages({commit,dispatch}, page = 1){
            let { ok, data } = await messagesApi.all(page)
            ok && data && commit('setMessages', data)
        },
        async getMessagesCount({commit,dispatch}){
            let { ok, data } = await messagesApi.count()
            ok && data && commit('setMessagesCount', data.count)
        },
        async getMessage({commit,dispatch}, id){
            let { ok, data } = await messagesApi.one(id)
            if(ok && data) return data
        },


        async add({state, getters, commit,dispatch},  payload){
            let { ok, data } = await messagesApi.add(payload);

            if(ok && data){
                dispatch('alerts/add', {text:'Сообщение успешно отправлено', timeout:2000,type:'success'}, {root:true})
            }
        },


    }
}