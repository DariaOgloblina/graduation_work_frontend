import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import React, {useContext, useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";
import {Context} from "./index";
import {check} from "./http/userAPI";
import Footer from "./components/footer/Footer";


function App() {
    const [modal, setModal] = useState(false);

    const {user} = useContext(Context);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setUser(data);
            user.setIsLogin(true);
        }).finally(() => setLoading(false));
    }, [])

    return (
            <BrowserRouter>
                <Navbar setVisible={setModal}/>
                <AppRouter visible={modal} setVisible={setModal}/>
                <Footer/>
            </BrowserRouter>
    );
}

export default App;
