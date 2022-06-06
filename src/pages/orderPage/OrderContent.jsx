import React, {useEffect} from 'react';
import classes from "./OrderPage.module.css";
import StatusSelector from "../../components/StatusSelector";
import ToyBlock from "../../components/ToyBlock";
import {changeDate} from "../../components/UI/ChangeDate";

const OrderContent = ({orderInfos, mainInfos, toyInfos}) => {
    useEffect(() => {
        orderInfos.data = changeDate(orderInfos.data)
    },[orderInfos])

    return (
        <div className={classes.mainDiv}>
            <div className={classes.generalInfo}>
                <div className={classes.generalBlocks}>
                    Дата формирования: {orderInfos.data}
                </div>
                <div className={classes.generalBlocks}>
                    #{orderInfos.id}
                </div>
                <div>
                    Общая сумма заказа: {orderInfos.amount} ₽
                </div>
            </div>
            <hr/>

            <h2 className={classes.infoTextMargin}>Информация о заказе</h2>
            <div className={classes.orderInfo}>

                <div className={classes.infoTextMargin}>
                    <span className={classes.boldText}>Место доставки(куда):</span><br/>
                    Город: {mainInfos.city}<br/>
                    Индекс: {mainInfos.index}<br/>
                    Адрес: {mainInfos.address}
                </div>
                <div className={classes.infoTextMargin}>
                    <span className={classes.boldText}>Информация о адресате:</span><br/>
                    {mainInfos.customer_name}
                </div>
                <div className={classes.colorRed}>
                    Статус заказа: {orderInfos.status}
                    <StatusSelector orderInfos={orderInfos} orderMainInfos={mainInfos} toyInfos={toyInfos}/>
                </div>
            </div>

            <h2 className={classes.infoTextMargin}>Состав заказа:</h2>
            {toyInfos.map(toy =>
                <ToyBlock key = {toy.id} toy={toy}/>
            )}
        </div>
    );
};

export default OrderContent;