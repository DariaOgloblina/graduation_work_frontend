import emailjs from 'emailjs-com';
import React, {useRef} from 'react';
import {observer} from "mobx-react-lite";

const EmailTextConstructor = observer(({supplier, selectedProducts, countArray, setVisible, setVisibleForm}) => {

    const form = useRef();

    const date = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 10);
    const dateString = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + 'г.\n';
    const deliveryDateString = deliveryDate.getDate() + '.' + (deliveryDate.getMonth() + 1) + '.' + deliveryDate.getFullYear() + 'г.';

    let productsString = '';
    let counter = 0;
    let allCost = 0;
    let allProductsCount;

    // eslint-disable-next-line array-callback-return
    selectedProducts.map(product => {
            if (countArray[counter]) {
                const currentCost = countArray[counter] * product.price;
                allCost += currentCost;
                allProductsCount += countArray[counter];
                const temp = product.name + ' Артикул: ' + product.id + ' Количество: ' + countArray[counter] +
                    ' Цена: ' + product.price + ' Общая стоимовть: ' + currentCost + '\n';
                productsString += temp;
            }
            counter++;
        }
    )
    const total = productsString + 'ИТОГО Количество: ' + allProductsCount + ' Общая стоимость: ' + allCost + '\n';

    const cancel = () => {
        setVisibleForm(true);
    }

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_v5rkc8v', 'template_ogz81zg', form.current, '3JpTx8hAFhxNxeegh')
            .then((result) => {
                console.log(result.text);
                setVisible(false);
                setVisibleForm(true);
            }, (error) => {
                alert(error.text);
            });
    };

    return (
        <div>
            <form ref={form} onSubmit={sendEmail}>
                <label>Кому</label>
                <textarea name="toWhomText" value={supplier.name}/>
                <label>Текущая дата</label>
                <input name="currentDate" value={dateString}/>
                <label>Дата доставки</label>
                <input name="deliveryDate" value={deliveryDateString}/>
                <label>Текст письма</label>
                <textarea name="message" value={total} />
                <input type="submit" value="Подтвердить" />
                <input type="button" value="Отменить" onClick={cancel}/>
            </form>
        </div>
    );
});

export default EmailTextConstructor;


