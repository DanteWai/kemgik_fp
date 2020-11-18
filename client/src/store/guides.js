import * as guideApi from "../api/guides";

export default {
    namespaced: true,
    state: {
        //guide:{},
        guides:[],
        guidesCount:0,
    },
    getters: {
        guide:state => state.guide,
        guides:state => state.guides,
        guidesCount:state => state.guidesCount
    },
    mutations: {
       /* setGuide(state, guide){
            state.guides = guide
        },*/
        setGuides(state, guides){
            state.guides = guides
        },
        setGuidesCount(state, count){
            state.guidesCount = count
        }
    },
    actions: {
        async addGuide({state, getters, dispatch}, {name, text}){
            let { ok, data } = await guideApi.add({name, text})
            if(ok && data){
                dispatch('alerts/add', {text:'Руководство успешно добавлено', timeout:2000,type:'success'}, {root:true})
            }
        },
        async updateGuide({state, getters, dispatch}, guide){
            let { ok, data } = await guideApi.update(guide)
            if(ok && data){
                dispatch('alerts/add', {text:'Руководство успешно обновлено', timeout:2000,type:'success'}, {root:true})
            }
        },
        async deleteGuide({state, getters, dispatch}, id){
            let { ok, data } = await guideApi.del(id)
            if(ok && data){
                dispatch('alerts/add', {text:'Руководство успешно удалено', timeout:2000,type:'success'}, {root:true})
            }
        },
        async getGuides({commit,dispatch}, page = 1){
            let { ok, data } = await guideApi.get(page)
            if(ok && data){
                commit('setGuides', data)
            }
        },
        async getFullGuides({commit}){
            let { ok, data } = await guideApi.getFull()
            if(ok && data){
                commit('setGuides', data)
            }
        },
        async getGuide({commit,dispatch}, id){
            let { ok, data } = await guideApi.getOne(id)
            if(ok && data){
                //commit('setGuide', data)
                return data
            }
        },
        async getGuidesCount({commit,dispatch}){
            let { ok, data } = await guideApi.getGuidesCount()
            if(ok && data){
                commit('setGuidesCount', data.count)
            }
        },
    }
}