import React from 'react';
import classes from "../pages/orderPage/OrderPage.module.css";
import {deleteOrder, updateOrderStatus} from "../http/orderAPI";
import {useNavigate} from "react-router-dom";
import {updateToyCount} from "../http/toyAPI";

const  StatusSelector = ({orderInfos, orderMainInfos, toyInfos}) => {

    const navigate = useNavigate();

    async function changeOrderStatus() {
        const select = document.getElementById('statusSelector');
        let toyStructure = '';
        const selectedValue = select.value.toString().toLowerCase();

        toyInfos.map(async toy => {
                const temp = toy.id + '(' + toy.count + '); ';
                toyStructure += temp;

                if (selectedValue === 'отменён' || selectedValue === 'отменён продавцом' || selectedValue === 'возвращён') {
                    await updateToyCount(toy.id, toy.count);
                }
            }
        )
        if (select.value !== orderInfos.status) {
            try {
                // eslint-disable-next-line no-restricted-globals
                const confirmation = confirm('Подтвердить смену статуса на ' + select.value);
                if (confirmation) {

                    if (selectedValue === 'доставлен' ||
                        selectedValue === 'отменён' ||
                        selectedValue === 'возвращён' ||
                        selectedValue === 'отменён продавцом'
                    ) {
                        await deleteOrder(orderInfos.id,
                            orderInfos.customer_id,
                            orderInfos.data.split('T')[0],
                            select.value.toString(),
                            orderInfos.amount,
                            orderMainInfos.customer_name,
                            orderMainInfos.city,
                            orderMainInfos.address,
                            toyStructure
                        )
                        navigate('/orders');
                    }else {
                        await updateOrderStatus(orderInfos.id, select.value).then(data =>
                            // eslint-disable-next-line no-restricted-globals
                            location.reload()
                        )
                    }
                }
            } catch (e) {
                alert(e.response.data.message);
            }
        } else {
            alert('Этот статус сейчас установлен!');
        }
    }

    return (
        <div>
            <select className={classes.changeOrderStatus} id='statusSelector'>
                <option value='Создан'>Создан</option>
                <option value='Подтвержден'>Подтвержден</option>
                <option value='Собран'>Собран</option>
                <option value='Передан в доставку'>Передан в доставку</option>
                <option value='Доставлен'>Доставлен</option>
                <option value='Отменён'>Отменён</option>
                <option value='Возвращён'>Возвращён</option>
                <option value='Отменён продавцом'>Отменён продавцом</option>
            </select>
            <button onClick={changeOrderStatus}>Изменить статус</button>
        </div>
    );
};

export default StatusSelector;