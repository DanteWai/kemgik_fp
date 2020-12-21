import server from './http';

export async function changeContacts(payload){
    let { data } = await server.put('api/users', payload, {
        errorSuppression: { text: 'при обновлении' }
    });
    return data;
}

export async function geyById(id){
    let { data } = await server.get('api/users/'+id, {
        errorSuppression: { text: 'при получении' }
    });
    return data;
}