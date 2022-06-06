import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from "./store/userStore";
import ToyStore from "./store/toyStore";
import OrdersStore from "./store/ordersStroe";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        toy: new ToyStore(),
        order: new OrdersStore()
    }}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Context.Provider>,

    document.getElementById('root')
);
reportWebVitals();
