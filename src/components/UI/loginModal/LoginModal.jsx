import React from 'react';
import classes from './LoginModal.module.css'
import LoginForm from "../../LoginForm";

const LoginModal = ({visible, setVisible}) => {
    const rootClasses = [classes.loginModal];
    if (visible === true) {
        rootClasses.push(classes.active);
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.loginModalContent} onClick={(e) => e.stopPropagation()}>
                <LoginForm setVisible={setVisible}/>
            </div>
        </div>
    );
};

export default LoginModal;