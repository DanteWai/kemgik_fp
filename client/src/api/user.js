import server from './http';

export async function changeContacts(payload){
    let { data } = await server.put('api/users', payload, {
        errorSuppression: { text: 'при обновлении' }
    });
    return data;
}