import { auth, db } from './FirebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import {Link, useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import {  signOut } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import {collection, onSnapshot, } from "firebase/firestore";

const Header = () => {

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [users, setUsers] = useState([])
    const [role, setRole] = useState(false)
    const [loadings, setLoading] = useState(false);

    useEffect(() => {
        if (loading) return;
    }, [user, loading]);


    useEffect(()=>{
        const unsub = onSnapshot(collection(db,"Users"), (snapshot) =>{
            snapshot.docs.forEach((doc) =>{
                if(auth.currentUser?.uid === doc.data().userUid){
                    setRole(doc.data().role)
                }
            });
        }, (error)=>{
            console.log(error);
        })
        return() =>{
            unsub();
        }
    }, []);

    useEffect(()=>{
        setLoading(true);
        const unsub = onSnapshot(collection(db,"Users"), (snapshot) =>{
            let list = [];
            snapshot.docs.forEach((doc) =>{
                if(auth.currentUser?.uid === doc.data().userUid){
                    list.push({id: doc.id, ...doc.data()})
                }
            });
            setUsers(list);
            console.log(users)
            setLoading(false);
        }, (error)=>{
            console.log(error);
        })
        return() =>{
            unsub();
        }
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        });
    }

    return (

            <header>
                <div className={'header-logo'}>
                    <a href={'/'} classname={'logo'} style={{textDecoration: 'none', color: 'black', fontFamily: 'Nerko One\', cursive'}}>
                        <h1>ЗАЧЁТКА</h1>
                    </a>
                </div>

                <div className={"nav-links"}>
                    <div className="dropdown">
                        <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        >
                            ИНФОРМАЦИЯ
                        </button>
                        {users && users.map((users) =>
                            <ul className="dropdown-menu">
                                <li onClick={() => navigate (`/profile/${users.id}`)} className="dropdown-item" type="button">Профиль</li>

                                <li hidden={role != "admin"}>
                                    <button onClick={() => navigate ('/reg')} className="dropdown-item" type="button">Зарегестрировать пользователя</button>
                                </li>

                                <li hidden={role != "admin"}>
                                    <button onClick={() => navigate ('/addNews')} className="dropdown-item" type="button">Добавить новость</button>
                                </li>

                                <li onClick={() => navigate (`/News`)} className="dropdown-item" type="button">Новости дневника</li>

                                <li onClick={() => navigate (`/marks`)} className="dropdown-item" type="button">Оценки</li>

                                <li onClick={() => navigate (`/feedback`)} className="dropdown-item" type="button">Оставить обращение</li>

                            </ul>
                        )}

                    </div>

                    <Link onClick={handleLogout} to="/hello" type="button" className="btn btn-dark">Выйти</Link>

                </div>
            </header>

    );
};

export default Header;