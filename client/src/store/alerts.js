let messagesAI = 0;

export default {
    namespaced: true,
    state: {
        messages: []
    },
    getters: {
        all: state => state.messages,
        isAlerts: state => state.messages.length > 0
    },
    mutations: {
        add(state, message){
            state.messages.push(message);
        },
        remove(state, id){
            state.messages = state.messages.filter(msg => msg.id !== id);
        }
    },
    actions: {
        add({ commit }, { text, timeout=6000, type='error' }){

            let id = ++messagesAI;
            commit('add', { id, text, type });

            if(timeout !== undefined){
                setTimeout(() => {
                    commit('remove', id);
                }, timeout);
            }
        }
    }
}