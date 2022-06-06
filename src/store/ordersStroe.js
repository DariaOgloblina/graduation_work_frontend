import {makeAutoObservable} from "mobx";

export default class OrdersStore {
    constructor() {
        this._orders = [];
        this._type = 'Создан';
        this._totalCount = 0;
        makeAutoObservable(this);
    }

    setOrders(orders){
        this._orders = orders;
    }

    setType(type){
        this._type = type;
    }

    setTotalCount(count) {
        this._totalCount = count;
    }

    get orders() {
        return this._orders;
    }

    get type() {
        return this._type;
    }

    get totalCount() {
        return this._totalCount;
    }
}