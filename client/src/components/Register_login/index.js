import React from 'react';
import MyButton from '../utils/button';
import Login from './login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>Nowi użytkownicy</h1>
                        <p>Serdecznie witamy nowych użytkowników. Stwórz sobie konto a nie pożałujesz</p>
                        <MyButton
                            type="default"
                            title="Stwórz konto"
                            linkTo="/register"
                            addStyles={{
                                margin:'10px 0 0 0'
                            }}
                        />
                    </div>
                    <div className="right">
                        <h2>Zarejestrowani użytkownicy</h2>
                        <p>Jeżeli masz konto, zaloguj się</p>
                        Zaloguj
                    </div>
                    <Login/>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;