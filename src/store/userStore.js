import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isLogin = false;
        this._user = {};
        makeAutoObservable(this);
    }

    setIsLogin(bool){
        this._isLogin = bool;
    }

    setUser(user){
        this._user = user;
    }

    get isLogin(){
        return this._isLogin;
    }

    get user(){
        return this._user;
    }
}