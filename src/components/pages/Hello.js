import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes, useNavigate} from "react-router-dom";

const Hello = () => {


    return (

        <div>

            <h1 className={'main-description'}>
                Привет, это зачётка
            </h1>
            <h2 className={'sub-description'}>
               Войдите в свой аккаунт введя логин и пароль, который вам выдал администратор
            </h2>
            <div className={'links-hello'}>
                <Link to="/auth" className="btn-hello" ><span>Авторизоваться</span></Link>
            </div>

        </div>
    );
};

export default Hello;