import React, {useContext} from 'react';
import classes from './ImageBlock.module.css'
import {Context} from "../../../index";

const ImageBlock = ({setVisible}) => {
    const {user} = useContext(Context);
    return (
        <div className={classes.generalDiv}>
            <div className={classes.content}>
                Добро пожаловать на сайт управления магазином softToys.ru<br/>
                Для начала работы необходимо авторизироваться.<br/>
                Удачи в работе!

                {
                    (!user.isLogin &&
                        <div className={classes.links}>
                            <a onClick={()=> {setVisible(true)}}>Авторизироваться</a>
                            <a onClick={()=>{window.scroll(0,800)}}>Отправить нам резюме</a>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default ImageBlock;