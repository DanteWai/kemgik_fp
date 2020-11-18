import jwt_decode from "jwt-decode";

const LOCAL_ACCESS_NAME = 'auth_accessToken';

function setTokens(access){
    localStorage.setItem(LOCAL_ACCESS_NAME, access);
}

function cleanTokensData(){
    localStorage.removeItem(LOCAL_ACCESS_NAME);
}

function getAccessToken(){
    return localStorage.getItem(LOCAL_ACCESS_NAME);
}

function getJWTPayload(token){
    return jwt_decode(token);
}


export { setTokens, cleanTokensData, getJWTPayload, getAccessToken }