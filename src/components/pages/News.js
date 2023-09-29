import React, { useEffect, useState } from 'react';
import Header from "../UI/Header";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {firebaseConfig, app, db, auth} from "../UI/FirebaseConfig";
import {collection, onSnapshot} from "firebase/firestore";

const News = () => {
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate()
    const [role, setRole] = useState(false)

    function search(e) {
        const val = e.target.value.trim();
        const elasticItems = document.querySelectorAll(".card .card-title")
        const card = document.querySelectorAll(".card")
        console.log(elasticItems)

        if (val != "") {
            elasticItems.forEach((el, index) => {
                if (el.innerText.search(val) == -1)
                    card[index].classList.add("searchItem")
                else
                    card[index].classList.remove("searchItem")
            })
        } else {
            card.forEach((el) => {
                el.classList.remove("searchItem")
            })
        }
    }

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

    useEffect(() => {
        // Инициализация Firestore
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // Получение доступа к коллекции Firestore
        const db = firebase.firestore();
        const collectionRef = db.collection('News');

        // Получение данных из коллекции
        collectionRef.get().then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                // Получение данных каждого документа
                const documentData = { id: doc.id, ...doc.data() };
                data.push(documentData);
            });
            setDocuments(data);
        });
    }, []);

    const handleEdit = (id) => {
        navigate(`/addNews/${id}`);
    };

    const handleDelete = (id) => {
        const db = firebase.firestore();
        const collectionRef = db.collection('News');

        // Удаление документа из коллекции
        collectionRef.doc(id).delete().then(() => {
            // Обновление списка документов после удаления
            const updatedDocuments = documents.filter((doc) => doc.id !== id);
            setDocuments(updatedDocuments);
        });
    };

        return (
            <div>
                <Header/>
                <Container>
                    <div style={{margin: '30px 30px 0 30px'}} className={'d-flex justify-content-between align-items-center'}>
                        <h1>Новости</h1>
                        <div>
                            <div style={{width: "400px"}} className="input-group">
                                <input placeholder={"Введите название новости которую хотите найти..."} onInput={(e) => search(e)} type="text" className="form-control"
                                       aria-label="Dollar amount (with dot and two decimal places)"/>
                            </div>
                        </div>
                    </div>
                    <div className={'d-flex flex-wrap'}>
                        {documents.map((document, index) => (
                            <div key={document.id} style={{width: '280px', margin: '30px'}} className="card">
                                <div className="card-header">
                                    Новость #{++index}
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{document.Title}</h5>
                                    <p style={{overflow: "hidden"}} className="card-text">{document.Description}</p>
                                    <div hidden={role != "admin"}>
                                        <button  className="edit-button btn btn-outline-dark" onClick={() => handleEdit(document.id)}>
                                            Редактировать
                                        </button>
                                        <button  className="delete-button btn btn-outline-danger m-lg-2" onClick={() => handleDelete(document.id)}>
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                   {/* <button style={{position: 'absolute', bottom: '50px', right: '50px'}} onClick={window.scrollTo({top:0, behavior:'smooth'})} className="btn btn-secondary">
                        ВВЕРХ
                    </button>*/}
                    <a href="#" className="btn-up"  id="myBtn" ></a>
                </Container>
            </div>

        );
    };


export default News;