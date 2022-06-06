import React from 'react';
import classes from "../descriptionCompanyBlock/DescriptionCompanyBlock.module.css"

const JobInformationDiv = () => {
    return (
        <div id = 'jobLink' className={classes.descriptionDiv}>
            <div className={classes.jobInfo}>
                <h2>Вы можете отправить нам своё резюме</h2>
                <div className={classes.workingConditions}>
                    <span className={classes.wrapper}>
                        <h3>Что мы предлагаем?</h3>
                    <ul>
                        <li>Оформление по договору</li>
                        <li>Высокий уровень дохода</li>
                        <li>Гибкий график работы</li>
                    </ul>
                    </span>
                   <span className={classes.wrapper}>
                        <h3>Что нужно делать?</h3>
                    <ul>
                        <li>Выдача товара курьеру</li>
                        <li>Прием и распределение товаров</li>
                        <li>Ведение базы во внутренней системе</li>
                    </ul>
                   </span>

                    <span className={classes.wrapper}>
                         <h3>Что мы ожидаем?</h3>
                    <ul>
                        <li>Знание ПК на уровне пользователя</li>
                        <li>Аккуратность, ответственность, исполнительность</li>
                    </ul>
                    </span>

                </div>
                <div className={classes.email}>
                    <a href="mailto:softToys@mail.ru?body=Здравствуйте, прилагаю своё резюме&subject=Работа">
                        Отправьте своё резюме по почте: softToys@mail.ru
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobInformationDiv;