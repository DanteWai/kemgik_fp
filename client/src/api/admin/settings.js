import server from "../http";

export async function getEmails(){
    let { data } = await server.get('api/settings/emails', {
        errorSuppression: { text: 'при получении емейлов' }
    });
    return data;
}

export async function saveEmails(payload){
    let { data } = await server.post('api/settings/emails', payload, {
        errorSuppression: { text: 'при изменении емейлов' }
    });
    return data;
}

export async function getUsers(page=1){
    let { data } = await server.get('api/settings/users', {
        params:{page},
        errorSuppression: { text: 'при получении пользователей' }
    });
    return data;
}

export async function getUsersSearch({page =1, search}){
    let { data } = await server.get('api/settings/users_search', {
        params:{page, search},
        errorSuppression: { text: 'при получении пользователей' }
    });
    return data;
}

export async function updateUser(user){
    let { data } = await server.put('api/settings/users/'+user.id,user, {
        errorSuppression: { text: 'при обновлении пользователя' }
    });
    return data;
}

export async function getUsersCount(){
    let { data } = await server.get('api/settings/users_count', {
        errorSuppression: { text: 'при получении пользователей' }
    });
    return data;
}