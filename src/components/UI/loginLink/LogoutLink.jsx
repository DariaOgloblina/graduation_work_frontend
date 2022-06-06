import React, {useContext} from 'react';
import classes from './LoginLink.module.css';
import {Link} from "react-router-dom";
import {Context} from "../../../index";

const LogoutLink = ({...props}) => {

    const {user} = useContext(Context);
    const logoutClick = () => {
        user.setUser({});
        user.setIsLogin(false);
        localStorage.removeItem('token');
    }

    return (
        <Link to='/'>
            <div onClick={logoutClick} className={classes.login + ' ' + classes.out}>
                <div className={classes.item__link} {...props}>
                    Выйти
                </div>
            </div>
        </Link>
    );
};

export default LogoutLink;