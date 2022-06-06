import React, {useContext} from 'react';
import '../styles/loginForm.css'
import {login} from "../http/userAPI";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useStateIfMounted} from "use-state-if-mounted";

const LoginForm = observer(({setVisible}) => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const [loginName, setLoginName] = useStateIfMounted('');
    const [password, setPassword] = useStateIfMounted('');

    const loginFormSubmit = async (event) => {
        if(loginName !== '' && password !== ''){
            try {
                event.preventDefault();
                let data = await login(loginName, password);
                user.setUser(data);
                user.setIsLogin(true);
                setVisible(false);
                navigate('/orders');
            } catch (e) {
                alert(e.response.data.message);
            }
        }else {
            event.preventDefault();
            alert("Вы не ввели логин или пароль!");
        }
    }

    return (
        <form onSubmit={loginFormSubmit}>
            <h2>Вход в аккаунт</h2>
            <p>Логин</p>
            <input type='text'
                   placeholder='Введие имя пользователя'
                   value={loginName}
                   onChange={e => setLoginName(e.target.value)}
            />
            <p>Пароль</p>
            <input type='password'
                   placeholder='Введите пароль'
                   value={password}
                   onChange={e => setPassword(e.target.value)}
            />
            <button type='submit'>Войти</button>
            <p className='pLoginAttention'>
                Если вы забыли пароль, обратитесь к Администратору: raven.admin@gmail.com
            </p>
        </form>
    );
});

export default LoginForm;