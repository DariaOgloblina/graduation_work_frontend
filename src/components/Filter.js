import {fetchToyLocation} from "../http/warehouseAPI";
import {fetchOrderInfo} from "../http/orderAPI";

export async function filterMinCount(list, setFilterList){
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        let toyCount;
        await fetchToyLocation(list[i].id).then(location =>
            toyCount = location.current_count
        );
        if(toyCount <= 20){
            newList.push(list[i]);
        }
    }
    setFilterList(newList);
    return newList;
}

export async function findByFilterName(list, filter, setFilterList) {
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i].name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
            newList.push(list[i]);
        }
    }
    await setFilterList(newList);
    return newList;
}

export async function findByFilterId(list, filter, setFilterList) {
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        if (String(list[i].id).indexOf(filter) !== -1) {
            newList.push(list[i]);
        }
    }
    await setFilterList(newList);
    return newList;
}

export async function findByFilterCustomerName(list, filter, setFilter){
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        let customerName;
        await fetchOrderInfo(list[i].id).then(orderInfo =>
            customerName = orderInfo.customer_name
        );

        if(customerName.toLowerCase().indexOf(filter.toLowerCase()) !== -1){
            newList.push(list[i]);
        }
    }
    setFilter(newList);
}