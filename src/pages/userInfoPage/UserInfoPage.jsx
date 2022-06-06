import React, {useContext, useEffect} from 'react';
import classes from './userInfoPage.module.css'
import {fetchUserInfo} from "../../http/userAPI";
import {Context} from "../../index";
import {useStateIfMounted} from "use-state-if-mounted";
import {changeDate} from "../../components/UI/ChangeDate";

const UserInfoPage = () => {

    const {user} = useContext(Context);
    const [userInfo, setUserInfo] = useStateIfMounted({});
    const [changedDate, setChangedDate] = useStateIfMounted('');

    useEffect(() =>{
        fetchUserInfo(user.user.id).then(userInfo => {
                setUserInfo(userInfo)
                setChangedDate(changeDate(userInfo.createdAt))
        }
        );
    },[])

    return (
        <div className={classes.userInfoDiv}>
            <h2>Информация о сотруднике</h2>
            <hr/>
            <div className={classes.userInfoDisplay}>
                <div className={classes.items}>
                    Логин:<br/>
                    Имя:<br/>
                    Фамилия:<br/>
                    Должность:<br/>
                    Дата регистрации:
                </div>
                <div className={classes.itemsContent}>
                    {user.user.login}<br/>
                    {userInfo.name}<br/>
                    {userInfo.surname}<br/>
                    {userInfo.position}<br/>
                    {changedDate}
                </div>
            </div>
            <div className={classes.link}>
                <a href='mailto:softToys@mail.ru?subject=Неточность данных пользователя'>Сообщить о неточности</a>
            </div>
        </div>
    );
};

export default UserInfoPage;