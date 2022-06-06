import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import classes from '../pages/orderPage/OrderPage.module.css'
import {fetchToyLocation} from "../http/warehouseAPI";
import {fetchSupplier} from "../http/toyAPI";
import {useStateIfMounted} from "use-state-if-mounted";

const ToyBlock = ({toy}) => {
    const navigate = useNavigate();
    const [ToyPicture, setToyPicture] = useState('');
    const [toyCount, setToyCount] = useStateIfMounted(0);
    const [supplier, setSupplier] = useStateIfMounted({});

    useEffect(() => {
        try {
            fetchToyLocation(toy.id).then(location =>
                setToyCount(location.current_count)
            );
            fetchSupplier(toy.id).then(supplier =>
                setSupplier(supplier)
            );
        }catch (e){
            alert(e.response.data.message);
        }
        try{
            setToyPicture(require('../resource/toysPicture/' + toy.img));
        }catch (e){
            alert('Нет изображения для' + toy.id);
        }
    }, [])

    return (
        <div className={classes.toyBlock}>
            <div className={classes.boldText}>
                Артикул: {toy.id}
            </div>
            <br/>
            <div className={classes.toyComponent} onClick={() => navigate('/toys/' + toy.id)}>
                <div>
                    <img className={classes.imageScale} src={ToyPicture} alt='Изображение игрушки'/>
                </div>

                <div className={classes.toyName}>
                    {toy.name}
                </div>

                {toy.count &&
                    <div className={classes.border}>
                        Количество: {toy.count}
                    </div>
                }

                <div className={classes.border}>
                    Количество на складе: {toyCount}
                </div>

                <div className={classes.border}>
                    {toy.price}₽
                </div>
            </div>
            <div className={classes.supplierInfo}>
                Производитель: <a className={classes.supplierLink} href={'/suppliers/' + supplier.id}>{supplier.name}</a>
            </div>
            {toyCount <= 20 &&
                <h4 className={classes.smallQuantity}>Необходимо докупить товар!</h4>
            }
        </div>
    );
};

export default ToyBlock;