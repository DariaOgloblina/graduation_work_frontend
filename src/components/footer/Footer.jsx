import React from 'react';
import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={classes.footerGeneral}>
            <div className={classes.footerContent}>
                <div className={classes.divInfo}>
                    По всем вопросом обращаться на почту: <a href='mailto:softToys@mail.ru'>softToys@main.ru</a>
                </div>
                <p>©2018 «OOO SOFTTOYS GROUP»</p>
            </div>
            <hr/>
        </div>
    );
};

export default Footer;