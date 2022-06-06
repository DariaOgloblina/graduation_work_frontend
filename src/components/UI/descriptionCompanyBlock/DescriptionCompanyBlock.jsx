import React from 'react';
import classes from "./DescriptionCompanyBlock.module.css"

const DescriptionCompanyBlock = () => {
    return (
        <div className={classes.descriptionDiv}>
            <div className={classes.descriptionContent}>
                Одно из главных преимуществ нашей компании – это гибкость в вопросе ценообразования.<br/>
                Индивидуальный подход к каждому клиенту создает особый климат сотрудничества, тем самым, улучшая течение всех бизнес процессов.
                На каждом этапе взаимодействия ведется контроль качества предоставляемых услуг.<br/> Мы непрерывно повышаем квалификацию всего персонала, основываясь на личном и мировом опыте.
                Все сотрудники, не исключая руководство, работают в режиме быстрого реагирования на потребности клиентов.
            </div>
        </div>
    );
};

export default DescriptionCompanyBlock;