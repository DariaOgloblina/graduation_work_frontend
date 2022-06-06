import {$host, $authHost} from './index';

export const fetchToys = async (supplier, page, limit = 10) =>{
    const {data} = await $authHost.get('api/toys', {params: {supplier, page, limit}});
    return data;
}

export const fetchOneToy = async (id) =>{
    const {data} = await $authHost.get('api/toys/' + id);
    return data;
}

export const fetchToyInfo = async (id) =>{
    const {data} = await $authHost.get('api/toys/' + id + '/info');
    return data;
}

export const updateToyCount = async (id, value) =>{
    const {data} = await $authHost.post('api/toys/' + id + '/updateCount?value=' + value);
    return data;
}

export const fetchSupplier = async (id) =>{
    const {data} = await $authHost.get('api/toys/' + id + '/supplier');
    return data;
}

export const deleteToy = async (id) =>{
    const {data} = await $authHost.get('api/toys/' + id + '/delete');
    return data;
}

export const createToy = async (id, name, price, imgName, supplierId, description, height, weight, material) =>{
    const {data} = await $authHost.post('api/toys/create', {
        id,
        name,
        price,
        imgName,
        supplierId,
        description,
        height,
        weight,
        material
    });
    return data;
}

export const updateToy = async (id, toyName, toyPrice, imgName, supplierId, description, height, weight, material) =>{
    const {data} = await $authHost.post('api/toys/' + id + '/update', {
        toyName,
        toyPrice,
        imgName,
        supplierId,
        description,
        height,
        weight,
        material
    });
    return data;
}