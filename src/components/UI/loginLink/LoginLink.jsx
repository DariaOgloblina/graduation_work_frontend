import React from 'react';
import classes from './LoginLink.module.css';

const LoginLink = ({setVisible, ...props}) => {
    return (
        <div className={classes.login + ' ' + classes.in} onClick={()=> {setVisible(true)}}>
            <a className={classes.item__link} {...props} >
                Войти
            </a>
        </div>
    );
};

export default LoginLink;