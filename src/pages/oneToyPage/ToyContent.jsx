import React, {useEffect, useState} from 'react';
import classes from "./ToyPage.module.css";
import {deleteToy} from "../../http/toyAPI";
import {useNavigate} from "react-router-dom";
import ToyRedactorModal from "../../components/UI/toyRedactorModal/ToyRedactorModal";

const ToyContent = ({toyMainInfo, toyInfo, supplier, location, toyRedactorVisible, setToyRedactorVisible}) => {

    const [backgroundPosition, setBgP] = useState('0% 0%');
    const [ToyPicture, setToyPicture] = useState('');
    const navigate = useNavigate();

    useEffect(() =>{
        try{
            setToyPicture(require('../../resource/toysPicture/' + toyMainInfo.img));
        }catch (e){
            alert('Нет изображения для' + toyMainInfo.id);
        }
    },[])

    const handleMouseMove = (e) => {
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const x = (e.pageX - left + 50) / width * 100;
        const y = (e.pageY - top - 300) / height * 100;
        setBgP(`${x}% ${y}%`);
    }

    function deleteToyButtonClick(){
        // eslint-disable-next-line no-restricted-globals
        const confirmDeleteToy = confirm("Подтвердите удаление товара.");
        if(confirmDeleteToy){
            try {
                deleteToy(toyMainInfo.id).then(r =>
                    navigate('/toys')
                )
            }catch (e) {
                alert(e.response.data.message);
            }
        }
    }

    return (
        <div className={classes.toyPage}>
           <div className={classes.divWithButtons}>
               <button onClick={() => setToyRedactorVisible(true)}>Редактировать</button>
               <button onClick={deleteToyButtonClick}>Удалить товар</button>
           </div>
            <div className={classes.header}>
                <div className={classes.toyName}>
                    {toyMainInfo.name}
                </div>
                <div className={classes.toyId}>
                    Артикул: {toyMainInfo.id}
                </div>
            </div>
            <hr/>
            <div className={classes.toyInfo}>
                <figure onMouseMove={handleMouseMove} style={
                    {
                        backgroundImage: `url(${ToyPicture})`,
                        backgroundPosition: backgroundPosition
                    }}>
                    <img id="image" className={classes.toyPicture} src={ToyPicture} alt='Изображение игрушки'/>
                </figure>

                <div className={classes.types}>
                    Тип:<br/>
                    Материал:<br/>
                    Высота игрушки,см:<br/>
                    Артирул:<br/>
                    Производитель:<br/>
                    Количество:<br/>
                    Локация:<br/>
                    <a className={classes.toDescription} onClick={() => {window.scroll(0, 800)}}>Перейти к описанию</a>
                </div>
                <div className={classes.fillingTypes}>
                    Мягкая игрушка<br/>
                    {toyInfo.material}<br/>
                    {toyInfo.height}<br/>
                    {toyMainInfo.id}<br/>
                    <a href={'/suppliers/' + supplier.id}>{supplier.name}</a><br/>
                    {location && location.current_count}
                    {location && location.current_count <= 20 &&
                        <span className={classes.pSmallCount}> !!!</span>
                    }
                    <br/>
                    {location && location.location}<br/>
                </div>
                <div className={classes.amount}>
                    {toyMainInfo.price}₽
                </div>
            </div>
            <div>
                <h3>Описание</h3>
                {toyInfo.description}
            </div>
            <h3>Характеристики</h3>
            <div className={classes.toyInfo}>
                <div>
                    Тип:<br/>
                    Материал:<br/>
                    Высота игрушки,см:<br/>
                    {toyInfo.weight && <span>Вес игрушки,кг:<br/></span>}
                    Артирул:
                </div>
                <div className={classes.typesTwo}>
                    Мягкая игрушка<br/>
                    {toyInfo.material}<br/>
                    {toyInfo.height}<br/>
                    {toyInfo.weight && <span>{toyInfo.weight}<br/></span>}
                    {toyMainInfo.id}
                </div>
            </div>
            <ToyRedactorModal
                toy={toyMainInfo}
                toyInfo={toyInfo}
                supplier={supplier}
                location={location}
                visible={toyRedactorVisible}
                setVisible={setToyRedactorVisible}
                isCreate={false}
            />
        </div>
    );
};

export default ToyContent;