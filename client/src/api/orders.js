import server from './http';

export async function add(payload){
    let { data } = await server.post('api/orders/', payload, {
        errorSuppression: { text: 'при отправке файлов' }
    });
    return data;
}

export async function update(payload){
    let { data } = await server.put('api/orders/' + payload.id, payload, {
        errorSuppression: { text: 'при обновлении заявки' }
    });
    return data;
}

export async function getOrders(page){
    let { data } = await server.get('api/orders/', {
        params:{page},
        errorSuppression: { text: 'при получении заявок' }
    });
    return data;
}

export async function getForUser(payload){
    let { data } = await server.get('api/orders/for_user', {
        params:payload,
        errorSuppression: { text: 'при получении заявок' }
    });
    return data;
}

export async function one(id){
    let { data } = await server.get('api/orders/one/'+id, {
        errorSuppression: { text: 'при получении заявки' }
    });
    return data;
}

export async function count(){
    let { data } = await server.get('api/orders/count', { errorSuppression: { text: 'при получении заявок'}});
    return data;
}