import * as ordersApi from "../api/orders"


export default {
    namespaced: true,
    state: {
        elements:[],
        elementsCount:0
    },
    getters: {
        elements:(state) => state.elements,
        elementsCount:(state) => state.elementsCount
    },
    mutations: {
        setElements(state, elements){
            state.elements = elements
        },
        setElementsCount(state, count){
            state.elementsCount = count
        }
    },
    actions: {
        async add({state, getters, commit,dispatch},  payload){
            if(payload.files.length > 0){
                payload.files = payload.files.map(file => ({id:file.name, name:file.name, ext:file.ext, path:file.path}))
            }
            let { ok, data } = await ordersApi.add(payload);
            if(ok && data)
                dispatch('alerts/add', {text:'Заявка успешно отправлена', timeout:4000,type:'success'}, {root:true})
        },
        async update({state, getters, commit,dispatch},  payload){
            await ordersApi.update(payload);
        },
        async getElements({state, getters, commit}, payload){
            let { ok, data } = await ordersApi.getOrders( payload);
            if(ok) commit('setElements', data)
        },
        async getElementsCount({commit}){
            let { ok, data } = await ordersApi.count()
            ok && data && commit('setElementsCount', data.count)
        },
        async getElement({commit,dispatch}, id){
            let { ok, data } = await ordersApi.one(id)
            if(ok && data) return data
        },
        async getForUser({state, getters, commit}, payload){ //user_id, page
            let { ok, data } = await ordersApi.getForUser(payload);
            if(ok) {
                commit('setElements', data.orders)
                commit('setElementsCount', data.count)
            }
        },
    }
}