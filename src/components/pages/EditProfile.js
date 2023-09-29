import {Link, useNavigate, useParams} from "react-router-dom";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {addDoc, serverTimestamp, collection, doc, updateDoc, getDoc} from "firebase/firestore"
import {auth, db, storage} from "../UI/FirebaseConfig";
import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {useAuthState} from "react-firebase-hooks/auth";
import {createUserWithEmailAndPassword} from "firebase/auth";


const initialState =  {

    Description: "",
}

const EditProfile = () => {


    const [user, loading] = useAuthState(auth);
    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setData] = useState(initialState);
    const {Nick, Description} = data;
    const { id } = useParams();
    const navigate = useNavigate();

    const onSubmit = async (e) => {

        e.preventDefault();
        setIsSubmit(true);
        await updateDoc(doc(db, "Users", id), {
            ...data
        });
                alert('Описание добавлено', true);
                navigate("/")
        }

    const onDelete = async (e) => {

        e.preventDefault();
        setIsSubmit(true);
        await updateDoc(doc(db, "Users", id), {
            ...data
        });
        alert('Описание удалено', true);
        navigate("/")
    }

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/hello");
    }, [user, loading]);


    const handleClick = (e) =>{
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <div className={"form-login"}>
            <div className="login-body">
                <form  className="form-horizontal">
                    <span className="heading">РЕДАКТИРОВАНИЕ ОПИСАНИЯ</span>
                    <div className="form-group">
                        <input type="text" className="form-control" onChange={handleClick} value={Description} name="Description" placeholder="Описание" />
                        <i className="fa fa-user"></i>
                    </div>

                    <div className="form-group">
                        <button style={{width: "100%", textDecoration: "none"}} onClick={onSubmit} className="btn-login btn-default">СОХРАНИТЬ</button>
                    </div>
                    <div className="form-group">
                        <button style={{width: "100%", textDecoration: "none", margin: "20px 0 0 0"}} onClick={onDelete} className="btn-login btn-default">УДАЛИТЬ ОПИСАНИЕ</button>
                    </div>
                </form>
                <div style={{margin: "80px 50px" }}>
                    <Link to="/" className="text-link">НА ГЛАВНУЮ</Link>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;