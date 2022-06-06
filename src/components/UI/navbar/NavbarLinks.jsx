import React from 'react';
import {Link} from "react-router-dom";

const NavbarLinks = () => {
    return (
        <div className='links'>
            <Link to='/toys' className='link__style'>Товары</Link>
            <Link to='/orders' className='link__style'>Заказы</Link>
            <Link to='/warehouse' className='link__style'>Найти товар на складе</Link>
            <Link to='/suppliers' className='link__style'>Поставщики</Link>
            <Link to='/accept' className='link__style'>Принять товар</Link>
            <Link to='/userInfo' className='link__style'>Информация о сотруднике</Link>
        </div>
    );
};

export default NavbarLinks;