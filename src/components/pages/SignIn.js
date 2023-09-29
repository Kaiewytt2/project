import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import '../../App.css'
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../UI/FirebaseConfig';
import {useAuthState} from "react-firebase-hooks/auth";

const SignIn = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [user, loading]);


    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/")

                console.log(user);
            })
            .catch((error) => {
                console.log(email,password)
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode == 'auth/invalid-email'){
                    alert("Invalid email!")
                }

                if(errorCode == 'auth/wrong-password'){
                    alert("Wrong password!")
                }
                function SignIn(){
                    const [user] = useAuthState(auth);
                    useEffect(() => {
                        if (user) navigate("/");
                    }, [user]);
                };
            });

    }

    return (


        <div className={"form-login"}>
        <div className="login-body">

                    <form className="form-horizontal">
                        <span className="heading">АВТОРИЗАЦИЯ</span>
                        <div className="form-group">
                            <input type="email" className="form-control" id="inputEmail" placeholder="E-mail" onChange={(e)=> setEmail(e.target.value)}/>
                                <i className="fa fa-user"></i>
                        </div>
                        <div className="form-group help">
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                                <i className="fa fa-lock"></i>
                                <a href="#" className="fa fa-question-circle"></a>
                        </div>
                        <div className="form-group">
                            <div className="main-checkbox">
                                <input type="checkbox" value="none" id="checkbox1" name="check"/>
                                <label htmlFor="checkbox1"></label>
                            </div>
                            <span className="text">Запомнить</span>
                            <button type="submit" className="btn-login btn-default" onClick={onLogin}>ВХОД</button>
                        </div>
                    </form>
            <div>
                <p className="words-color">Забыли пароль? <Link to="/reset" className="text-link">Восстановить пароль</Link></p>
            </div>

        </div>
        </div>
    );
};


export default SignIn;