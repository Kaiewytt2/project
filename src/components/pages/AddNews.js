import {Link, useNavigate, useParams} from "react-router-dom";
import {addDoc, serverTimestamp, collection} from "firebase/firestore"
import {db} from "../UI/FirebaseConfig";
import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {app} from "../UI/FirebaseConfig";


const initialState = {
    Title: "",
    Description: "",
};

const AddNews = () => {
    const [progress, setProgress] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setData] = useState(initialState);
    const {Title, Description} = data;
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const handleClick = (e) =>{
            setData({ ...data, [e.target.name]: e.target.value });
        }
    });

    const handleClick = (e) =>{
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsSubmit(true);

        if (id) {
            // Удаление старой новости перед редактированием
            const db = firebase.firestore();
            const collectionRef = db.collection('News');

            // Удаление старой новости перед редактированием
            collectionRef.doc(id).delete()
        }

        await addDoc(collection(db, "News"), {
            ...data,
            timestamp: serverTimestamp()
        })
        alert(`Новость ${id ? "редактирована" : "добавлена"}!`, true)

        navigate ("/news")
    }

    return (
        <div className={"form-login"}>
            <div className="login-body">
                <Form onSubmit={handleSubmit} className="form-horizontal">
                    <span className="heading">{id ? "РЕДАКТИРОВАНИЕ" : "ДОБАВЛЕНИЕ"} НОВОСТИ</span>
                    <div className="form-group">
                        <input type="text" className="form-control" onChange={handleClick} value={Title} name="Title" placeholder="Название" required/>
                        <i className="fa fa-user"></i>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" onChange={handleClick} value={Description} name="Description" placeholder="Описание" required/>
                        <i className="fa fa-user"></i>
                    </div>

                    <div className="form-group">
                        <button style={{width: "100%", textDecoration: "none"}} id="addNews" disabled={progress !== null && progress < 100} className="btn-login btn-default">СОХРАНИТЬ НОВОСТЬ</button>
                    </div>
                </Form>
                <div style={{margin: "80px 50px" }}>
                    <Link to="/" className="text-link">НА ГЛАВНУЮ</Link>
                </div>
            </div>
        </div>
    );
}
export default AddNews;