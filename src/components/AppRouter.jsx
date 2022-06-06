import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import OrdersPage from "../pages/ordersPage/OrdersPage";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import OrderPage from "../pages/orderPage/OrderPage";
import ToysPage from "../pages/toysPage/ToysPage";
import ToyPage from "../pages/oneToyPage/ToyPage";
import SuppliersPage from "../pages/suppliersPage/SuppliersPage";
import SupplierPage from "../pages/oneSupplierPage/SupplierPage";
import WarehousePage from "../pages/warehousePage/WarehousePage";
import AcceptProductPage from "../pages/acceptProductPage/AcceptProductPage";
import UserInfoPage from "../pages/userInfoPage/UserInfoPage";

const AppRouter = observer(({visible, setVisible}) => {

    const {user} = useContext(Context);

    return (

        user.isLogin
            ?
            <Routes>
                <Route path="toys" element={<ToysPage/>}/>
                <Route path="toys/:id" element={<ToyPage/>}/>
                <Route path="orders" element={<OrdersPage/>}/>
                <Route path="orders/:id" element={<OrderPage/>}/>
                <Route path="suppliers" element={<SuppliersPage/>}/>
                <Route path="suppliers/:id" element={<SupplierPage/>}/>
                <Route path="warehouse" element={<WarehousePage/>}/>
                <Route path="accept" element={<AcceptProductPage/>}/>
                <Route path="userInfo" element={<UserInfoPage/>}/>
                <Route path="/" element={<MainPage visible={visible} setVisible={setVisible}/>}/>
            </Routes>
            :
            <Routes>
                {/*<Route render={() => <Redirect to="error" />} />*/}
                <Route path="/" element={<MainPage visible={visible} setVisible={setVisible}/>}/>
            </Routes>
    );
});

export default AppRouter;