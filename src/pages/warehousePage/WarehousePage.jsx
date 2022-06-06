import React, {useState} from 'react';
import classes from './WarehousePage.module.css';
import layoutOfWarehouse from '../../resource/layoutOfRoom.png'
import {fetchToyLocation} from "../../http/warehouseAPI";

const WarehousePage = () => {

    const [toyLocation, setToyLocation] = useState('');
    const [inputValue, setInputValue] = useState('');

    async function findLocation() {
        if (inputValue && Number.isInteger(Number(inputValue))) {
            try {
                await fetchToyLocation(inputValue).then(location => {
                        setToyLocation(location.location)
                })
            } catch (e) {
                alert(e.response.data.message);
            }
        }else {
            alert('Необходимо ввести артикул!')
        }
    }

    return (
        <div className={classes.generalDiv}>
            <h1>Схема склада:</h1>
            <div className={classes.findDiv}>
                <img src={layoutOfWarehouse} alt='LayoutOfWarehouse'/>
                <div className={classes.findBlock}>
                    Введите артикул товара<br/>
                    <input type="text"
                           placeholder='Введите артикул'
                           onChange={e => {
                               setInputValue(e.target.value);
                               setToyLocation('');
                           }}
                    />
                    <button onClick={findLocation}>Найти</button><br/>
                    {toyLocation &&
                        <div className={classes.location}>Товар находится на стеллаже/ах: {toyLocation}</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default WarehousePage;