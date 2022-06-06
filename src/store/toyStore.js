import {makeAutoObservable} from "mobx";

export default class ToyStore {
    constructor() {
        this._toys = [];
        this._selectedSupplier = '';
        this._page = 1;
        this._totalCount = 0;
        this._limit = 100;
        makeAutoObservable(this);
    }

    setToys(toys) {
        this._toys = toys;
    }

    setSelectedSupplier(supplier) {
        this.setPage(1);
        this._selectedSupplier = supplier;
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(count) {
        this._totalCount = count;
    }

    get toys() {
        return this._toys;
    }
    get selectedSupplier() {
        return this._selectedSupplier;
    }
    get totalCount() {
        return this._totalCount;
    }
    get page() {
        return this._page;
    }
    get limit() {
        return this._limit;
    }
}