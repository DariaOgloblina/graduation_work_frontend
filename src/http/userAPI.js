import {$host, $authHost} from './index';
import jwt_decode from 'jwt-decode';

export const login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const check = async ()=>{
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const fetchUserInfo = async (id)=>{
    const {data} = await $authHost.get('api/user/' + id + '/userInfo');
    return data;
}