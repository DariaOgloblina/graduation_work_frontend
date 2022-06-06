import React, {useEffect, useState} from 'react';
import classes from "./OrderBlock.module.css";
import {useNavigate} from "react-router-dom";
import {fetchOrderInfo} from "../../../http/orderAPI";
import {useStateIfMounted} from "use-state-if-mounted";
import {changeDate} from "../../../components/UI/ChangeDate";


const OrderBlock = ({order}) => {

    const navigate = useNavigate();

    const [city, setCity] = useStateIfMounted('');
    const [customerName, setCustomerName] = useStateIfMounted('');
    const [address, setAddress] = useStateIfMounted('');
    const [index, setIndex] = useStateIfMounted('');
    const [changedDate, setChangedDate] = useStateIfMounted('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        await fetchOrderInfo(order.id).then(data => {
            setCity(data.city);
            setCustomerName(data.customer_name);
            setAddress(data.address);
            setIndex(data.index);
            setChangedDate(changeDate(order.data));
        });
    },[])

    return (
        <div className={classes.orderDiv} onClick={() => navigate('/orders/' + order.id)}>
            <div className={classes.orderInfo}>
                <h3> Заказ #{order.id}</h3>
                ID Покупателя: {order.customer_id}<br/>
                Дата оформления: {changedDate}<br/>
                Кому: {customerName}<br/>
                Индекс: {index}<br/>
                Город: {city}<br/>
                Адрес: {address}
            </div>
            <div className={classes.amount}>
                Стоимость: {order.amount}р.
                <div className={classes.status}>
                    Статус: {order.status}
                </div>
            </div>
        </div>
    );
};

export default OrderBlock;