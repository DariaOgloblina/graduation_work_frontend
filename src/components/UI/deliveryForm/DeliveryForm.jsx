import React, {useRef, useState} from 'react';
import classes from './DeliveryForm.module.css'
import {observer} from "mobx-react-lite";
import emailjs from "emailjs-com";

const DeliveryForm = observer(({supplier, allToys, setVisible}) => {

    const form = useRef();
    let counter = 0;
    const [visibleForm, setVisibleForm] = useState(true);
    const [total, setTotal] = useState('');
    const toysCount = [];

    const date = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 10);
    const dateString = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + 'г.\n';
    const deliveryDateString = deliveryDate.getDate() + '.' + (deliveryDate.getMonth() + 1) + '.' + deliveryDate.getFullYear() + 'г.';

    function selectionProducts(){
        let productsString = '';
        let counterProducts = 0;
        let allCost = 0;
        let allProductsCount = 0;
        // eslint-disable-next-line array-callback-return
        allToys.map(product => {
                if (toysCount[counterProducts]) {
                    const currentCost = toysCount[counterProducts] * product.price;
                    allCost += currentCost;
                    allProductsCount += Number(toysCount[counterProducts]);
                    const temp = product.name + ' Артикул: ' + product.id + ' Количество: ' + toysCount[counterProducts] +
                        ' Цена: ' + product.price + ' Общая стоимоcть: ' + currentCost + '\n';
                    productsString += temp;
                }
            counterProducts++;
            }
        )
        setTotal(productsString + 'ИТОГО Количество: ' + allProductsCount + ' Общая стоимость: ' + allCost + '\n');
    }

    function cancel() {
        setVisibleForm(true);
    }

    function sendEmail(e){
        e.preventDefault();
        emailjs.sendForm('service_v5rkc8v', 'template_ogz81zg', form.current, '3JpTx8hAFhxNxeegh')
            .then((result) => {
                setVisible(false);
                setVisibleForm(true);
            }, (error) => {
                alert(error.text);
            });
    }

    function DeliveryFormSubmit(event) {
        event.preventDefault();
        if(toysCount.length > 0){
            setVisibleForm(false);
            selectionProducts();
        }else{
            alert('Вы не ввели ни одного значения!');
        }
    }

    function SetCount(index, value) {
        toysCount[index] = value;
    }

    return (
        <div className={classes.deliveryFormMaxHeight}>
            {
                visibleForm &&
                <form onSubmit={DeliveryFormSubmit}>
                    <h2>Оформление доставки</h2>
                    <h3>Имя поставщика: {supplier.name}</h3>
                    <div>
                        Измените количество на необходимое, отличное от нуля.<br/>
                        После ввода количества товара, нажмите "Отправить"
                    </div>
                    {allToys.map(toy =>
                        <div key={toy.id} className={classes.toysItem}>
                            <div className={classes.toysParams}>
                                {toy.id}
                            </div>
                            <div className={classes.toysParams}>
                                {toy.name}
                            </div>
                            <div className={classes.toysParams}>
                                {toy.price}₽
                            </div>
                            <div>
                                <label>Количество:</label>
                                <input
                                    type="number"
                                    id = {counter++}
                                    onChange={e => SetCount(e.target.id, e.target.value)}
                                    placeholder="0"
                                    min="1"
                                    max="500"
                                    step="1"
                                />
                            </div>
                        </div>
                    )}
                    <button type='submit'>Отправить письмо</button>
                </form>
            }
            {!visibleForm &&
                <form ref={form} onSubmit={sendEmail}>
                    <label>Кому</label>
                    <input name="toWhomText" value={supplier.name}/>
                    <label>Текущая дата</label>
                    <input name="currentDate" value={dateString}/>
                    <label>Дата доставки</label>
                    <input name="deliveryDate" value={deliveryDateString}/>
                    <label>Текст письма</label>
                    <textarea className={classes.textareaHeight} name="message" value={total} />
                    <div className={classes.buttonsDiv}>
                        <button type="submit">Подтвердить</button>
                        <button className={classes.buttonCansel} onClick={cancel}>Отменить</button>
                    </div>
                </form>
            }
        </div>
    );
});

export default DeliveryForm;