import React, {useEffect, useState} from 'react';
import Header from "../UI/Header";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../UI/FirebaseConfig";
import {Image} from "react-bootstrap";
import {collection, onSnapshot, getDoc, doc, updateDoc, getFirestore} from "firebase/firestore";

const Profile = () => {

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [info, setInfo] = useState([]);
    const [loadings, setLoading] = useState(false);



    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/hello");
    }, [user, loading]);


    useEffect(()=>{
        setLoading(true);
        const unsub = onSnapshot(collection(db,"Users"), (snapshot) =>{
            let list = [];
            snapshot.docs.forEach((doc) =>{
                if(auth.currentUser?.uid === doc.data().userUid){
                    list.push({id: doc.id, ...doc.data()})
                }
            });
            setInfo(list);
            setLoading(false);
        }, (error)=>{
            console.log(error);
        })
        return() =>{
            unsub();
        }
    }, []);


    const html = (item) => {
        if (item.userUid === user.uid){
            return (
                <div key={item.id} className={'profile'} >

                    <h5>Имя: <i>{item.name}</i></h5>
                    <h5>Фамилия: <i>{item.surname} </i></h5>
                    <h5>Отчество: <i>{item.patronymic}</i></h5>
                    <h5>Дата рождения: <i>{item.birthday}</i></h5>
                    <h5>Номер школы: <i>{item.schoolnumber}</i></h5>
                    <h5>Номер класса: <i>{item.classnumber}</i></h5>
                    <h5>Описание: <i>{item.Description}</i></h5>

                </div>
            );
        }
    }


    return (

        <div>
            <Header/>
                <span className={'center-text'}>ПРОФИЛЬ</span>

            <div>
                {info && info.map((item)=>(html(item)))}
            </div>
            {info && info.map((info) =>
            <div className={'right-item'}>
                <button onClick={() => navigate(`/editprofile/${info.id}`)} className="btn-def" ><span>РЕДАКТИРОВАТЬ ОПИСАНИЕ</span></button>
            </div>
                )}
        </div>
    );
};

export default Profile;