import {$authHost} from './index';

export const fetchSuppliers = async () =>{
    const {data} = await $authHost.get('api/suppliers' );
    return data;
}

export const fetchOneSupplier = async (id) =>{
    const {data} = await $authHost.get('api/suppliers/' + id);
    return data;
}

export const fetchAllProducts = async (id) =>{
    const {data} = await $authHost.get('api/suppliers/' + id + '/products');
    return data;
}

export const deleteSupplier = async (id) =>{
    const {data} = await $authHost.get('api/suppliers/' + id + '/delete');
    return data;
}

export const createSupplier = async (supplierName, supplierEmail, supplierPhone) =>{
    const {data} = await $authHost.post('api/suppliers/create', {supplierName, supplierEmail, supplierPhone});
    return data;
}

export const updateSupplier = async (id, supplierName, supplierEmail, supplierPhone) =>{
    const {data} = await $authHost.post('api/suppliers/' + id + '/update', {supplierName, supplierEmail, supplierPhone});
    return data;
}