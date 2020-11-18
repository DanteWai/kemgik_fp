import server from './http';

export async function login(login, password){
    let { data } = await server.post('auth/login', { login, password }, {
        errorSuppression: { text: '' }
    });
    return data;
}

export async function check(){
    let { data } = await server.get('auth/check', {
        errorSuppression: {},
        silence401: true
    });
    return data;
}

export async function refresh(){
    let { data } = await server.get('auth/refresh');
    return data;
}

export async function logout(){
    let { data } = await server.get('auth/logout', {
        withCredentials: true,
        errorSuppression: { text: '' }
    });
    return data;
}