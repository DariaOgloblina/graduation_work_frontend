import {$host, $authHost} from './index';

export const fetchOrders = async (type) =>{
    const {data} = await $host.get('api/orders', {params: {type}});
    return data;
}

export const fetchOneOrder = async (id) =>{
    const {data} = await $authHost.get('api/orders/' + id);
    return data;
}

export const fetchOrderInfo = async (id) =>{
    const {data} = await $authHost.get('api/orders/' + id + '/info');
    return data;
}

export const fetchOrderStructure = async (id) =>{
    const {data} = await $authHost.get('api/orders/' + id + '/structure');
    return data;
}

export const updateOrderStatus = async (id, value) =>{
    const {data} = await $authHost.post('api/orders/' + id + '/setStatus?statusValue=' + value);
    return data;
}

export const deleteOrder = async (id, customer_id, date, status, amount, customer_name, city, address, structure) =>{
    const {data} = await $authHost.post('api/orders/' + id + '/delete', {
        customer_id,
        date,
        status,
        amount,
        customer_name,
        city,
        address,
        structure
    });
    return data;
}