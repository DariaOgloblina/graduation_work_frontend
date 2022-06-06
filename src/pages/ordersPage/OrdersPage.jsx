import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchOrders} from "../../http/orderAPI";
import {setContentLoading} from "../../components/SetLoader";
import OrdersContent from "./OrdersContent";
import classes from './OrdersPage.module.css';
import {findByFilterCustomerName, findByFilterId} from "../../components/Filter";

const OrdersPage = observer(() => {

    const {order} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState(true);
    const [list, setList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [filterCustomerName, setFilterCustomerName] = useState('');
    const [filterOrderId, setFilterOrderId] = useState('');

    useEffect(() => {
        fetchOrders().then(data => {
            order.setOrders(data.rows);
            order.setTotalCount(data.count);
            order.setType('Создан');
            setList(data.rows);
            setFilterList(data.rows);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchOrders(order.type).then(data => {
            order.setOrders(data.rows);
            order.setTotalCount(data.count);
            setList(data.rows);
            setFilterList(data.rows);
        })
    }, [order.type]);

    function onClickCheckBox(e){
        if(e.checked){
            if(e.value === 'all'){
                order.setType('');
            }else {
                order.setType(e.value);
            }
        }
    }

    function onButtonSetFilterClick(){
        if(filterOrderId){
            setFilterList(findByFilterId(filterList, filterOrderId));
        }
        if(filterCustomerName){
            findByFilterCustomerName(filterList, filterCustomerName, setFilterList);
        }

        if(!filterOrderId && !filterCustomerName){
            setFilterList(list);
        }
    }

    return (
        <div>
            <h1 className='orderPageHeader'>Текущие заказы:</h1>
            <h3 className='orderPageHeader'>Фильтровать:</h3>
            <div className={classes.divWithFilters}>
                <div className={classes.divWithInputs}>
                    <input
                        name='checkedStatus'
                        type='radio'
                        value='all'
                        onChange={(e) => {onClickCheckBox(e.target);setChecked(false);}}
                    />Показать все<br/>
                    <input
                        name='checkedStatus'
                        type='radio'
                        value='Создан'
                        checked={checked}
                        onChange={(e) => {onClickCheckBox(e.target);setChecked(!checked);}}
                    />Создан<br/>
                    <input
                        name='checkedStatus'
                        type='radio'
                        value='Подтвержден'
                        onChange={(e) => {onClickCheckBox(e.target);setChecked(false);}}
                    />Подтвержден<br/>
                    <input
                        name='checkedStatus'
                        type='radio'
                        value='Собран'
                        onChange={(e) => {onClickCheckBox(e.target); setChecked(false);}}
                    /> Собран<br/>
                    <input
                    name='checkedStatus'
                    type='radio'
                    value='Передан в доставку'
                    onChange={(e) => {onClickCheckBox(e.target); setChecked(false);}}
                />Передан в доставку
                </div>

                <div>
                    <input
                        type='text'
                        placeholder='Введите ФИО'
                        value={filterCustomerName}
                        onChange={(e)=> setFilterCustomerName(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Введите номер заказа'
                        value={filterOrderId}
                        onChange={(e)=> setFilterOrderId(e.target.value)}
                    />
                    <button onClick={onButtonSetFilterClick}>Применить</button>
                </div>

            </div>
            {
                setContentLoading(<OrdersContent
                    order={order}
                    list={list}
                    filterList={filterList}
                    setFilterList={setFilterList}
                />, order.totalCount, loading)
            }
        </div>
    );
});

export default OrdersPage;