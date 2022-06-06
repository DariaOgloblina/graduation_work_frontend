import React, {useContext} from 'react';
import BasketLogo from "../../../resource/basket.svg";
import LoginLink from "../loginLink/LoginLink";
import LogoutLink from "../loginLink/LogoutLink";
import {Link} from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const Navbar = observer(({setVisible}) => {

    const {user} = useContext(Context);

    let links;
    if(user.isLogin){
       links = <NavbarLinks/>;
    }

    return (
        <div className='navbar'>
            <Link to='/'>
                <img className='logo' src={BasketLogo} alt="Логотип basket.com"/>
            </Link>
            {links}
            {user.isLogin
                ? <LogoutLink/>
                : <LoginLink setVisible={setVisible}/>
            }
        </div>
    );
});

export default Navbar;