import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import '../../App.css'
import {  createUserWithEmailAndPassword   } from 'firebase/auth';
import { auth, db } from '../UI/FirebaseConfig';
import {addDoc, collection} from "firebase/firestore"
import {useAuthState} from "react-firebase-hooks/auth";



const SignUp = () => {

    const initialState = {
        name: "",
        surname: "",
        patronymic: "",
        schoolnumber: "",
        classnumber: "",
        birthday: "",
        phone: "",
        role: ""
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState(initialState);
    const {name, surname, patronymic, schoolnumber, classnumber, birthday, phone, role} = data;
    const [isSubmit, setIsSubmit] = useState(false);


    const handleClick = (e) =>{
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert('Пользователь успешно зарегистрирован', true);
                navigate("/")

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode)
                console.log(errorMessage)

                if(errorCode == 'auth/invalid-email')
                    return alert('Некорректный E-mail', false);

                if(errorCode == 'auth/missing-email')
                    return alert('Заполните E-mail', false);

                if(errorCode == 'auth/missing-password')
                    return alert('Заполните пароль', false);

                if(errorCode == 'auth/weak-password')
                    return alert('Пароль должен содержать более 6 символов', false);

                if(errorCode == 'auth/email-already-in-use')
                    return alert('Данный E-mail уже существует', false);
            });
        const userUid = auth.currentUser.uid;
        await addDoc(collection(db, "Users"), {
            ...data,
            userUid,
            name,
            surname,
            patronymic,
            schoolnumber,
            classnumber,
            birthday,
            phone,
            role
        })

    }

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/hello");

    }, [user, loading]);

    return (

        <div className={"form-login"}>
            <div className="login-body">

                <form className="form-horizontal">
                    <span className="heading">РЕГИСТРАЦИЯ</span>
                    <h6>Все поля обязательны к заполнению!</h6>
                    <div className="form-group">

                        <div className="form-group">
                            <input className="form-control" type={'email'} placeholder="E-mail" onChange={(e)=> setEmail(e.target.value)} required/>
                            <i className="fa fa-user"></i>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type={'password'} placeholder="Пароль" onChange={(e)=> setPassword(e.target.value)} required/>
                            <i className="fa fa-user"></i>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type={'text'} placeholder="Имя" onChange={handleClick} value={name} name="name" required/>
                            <i className="fa fa-user"></i>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type={'text'} placeholder="Фамилия" onChange={handleClick} value={surname} name="surname" required/>
                            <i className="fa fa-user"></i>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type={'text'} placeholder="Отчество" onChange={handleClick} value={patronymic} name="patronymic" required/>
                            <i className="fa fa-user"></i>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type={'text'} placeholder="Номер школы" onChange={handleClick} value={schoolnumber} name="schoolnumber" required/>
                            <i className="fa fa-user"></i>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type={'text'} placeholder="Номер класса" onChange={handleClick} value={classnumber} name="classnumber" required/>
                            <i className="fa fa-user"></i>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type={'date'} placeholder="День рождения дд.мм.гггг" onChange={handleClick} value={birthday} name="birthday" required/>
                            <i className="fa fa-user"></i>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type={'text'} placeholder="Номер телефона" onChange={handleClick} value={phone} required name="phone"/>
                            <i className="fa fa-user"></i>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type={'text'} placeholder="Роль teacher / user" onChange={handleClick} value={role} name="role" required/>
                            <i className="fa fa-user"></i>
                        </div>

                        <button className={'btn-login btn-default'} type={'button'} onClick={onSubmit} >Зарегистрироваться</button>

                        <div>
                            <Link to="/" className="text-link">НА ГЛАВНУЮ</Link>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;