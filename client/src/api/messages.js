import server from './http';

export async function add(payload){
    let { data } = await server.post('api/messages/', payload, {
        errorSuppression: { text: 'при отправке сообщения' }
    });
    return data;
}

export async function all(page){
    let { data } = await server.get('api/messages/', {
        params:{page},
        errorSuppression: { text: 'при получении сообщений' }
    });
    return data;
}

export async function one(id){
    let { data } = await server.get('api/messages/one/'+id, {
        errorSuppression: { text: 'при получении сообщений' }
    });
    return data;
}

export async function count(){
    let { data } = await server.get('api/messages/count', {
        errorSuppression: { text: 'при получении сообщений' }
    });
    return data;
}

