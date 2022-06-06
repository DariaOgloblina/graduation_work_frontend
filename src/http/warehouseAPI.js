import {$authHost} from './index';

export const fetchLocations = async () =>{
    const {data} = await $authHost.get('api/warehouse' );
    return data;
}

export const fetchOneLocation = async (id) =>{
    const {data} = await $authHost.get('api/warehouse/' + id);
    return data;
}

export const fetchToyLocation = async (id) =>{
    const {data} = await $authHost.get('api/warehouse/toy/' + id);
    return data;
}

export const createLocation = async (location, current_count, toyId) =>{
    const {data} = await $authHost.post('api/warehouse/create', {location, current_count, toyId});
    return data;
}

export const updateLocation = async (id, location, current_count, toyId) =>{
    const {data} = await $authHost.post('api/warehouse/' + id + '/update', {location, current_count, toyId});
    return data;
}