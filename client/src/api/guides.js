import server from './http';


export async function get(page=1){
    let { data } = await server.get('api/guides/', {
        params:{page},
        errorSuppression: { text: 'при получении элементов' }
    });
    return data;
}

export async function getFull(){
    let { data } = await server.get('api/guides/full', {
        errorSuppression: { text: '' }
    });
    return data;
}

export async function getOne(id){
    let { data } = await server.get('api/guides/one/'+id, {
        errorSuppression: { text: 'при получении элемента' }
    });
    return data;
}

export async function getGuidesCount(){
    let { data } = await server.get('api/guides/count', {
        errorSuppression: { text: '' }
    });
    return data;
}

export async function add(payload){
    let { data } = await server.post('api/guides/', payload, {
        errorSuppression: { text: 'при добавления руководства' }
    });
    return data;
}

export async function update(payload){
    let { data } = await server.put('api/guides/', payload, {
        errorSuppression: { text: 'при обновлении руководства' }
    });
    return data;
}

export async function del(id){
    let { data } = await server.delete('api/guides/'+id, {
        errorSuppression: { text: 'при удалении руководства' }
    });
    return data;
}


