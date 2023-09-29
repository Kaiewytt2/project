import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {db, auth, firebaseConfig} from "../UI/FirebaseConfig";
import {collection, onSnapshot} from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import {Container, Dropdown} from "react-bootstrap";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {app} from "../UI/FirebaseConfig";
import Header from "../UI/Header";


const MarksPage = () => {
    const [marks, setMarks] = useState([]);
    const [selectedSchoolNumber, setSelectedSchoolNumber] = useState('');
    const [selectedClassNumber, setSelectedClassNumber] = useState('');
    const [selectedStudentName, setSelectedStudentName] = useState('');
    const [selectedStudent, setSelectedStudent] = useState();
    const [selectedMark, setSelectedMark] = useState('');
    const [selectedLesson, setSelectedLesson] = useState('');
    const [students, setStudents] = useState([]);
    const [schools, setSchools] = useState([]);
    const [classChildren, setClassChildren] = useState([]);
    const [lessons, setLessons] = useState([])
    const [role, setRole] = useState(null);


    // Дополнительные состояния для авторизации
    useEffect(()=>{
        const getMarks = onSnapshot(collection(db,"Marks"), (snapshot) =>{
            let data = []
            let res = []
            let lessonsArray = []
            snapshot.docs.forEach((doc) =>{
                if(auth.currentUser?.uid === doc.data().UserID)
                    res.push(doc.data())
            });
            res.forEach(lesson =>  {
                if (!lessonsArray.includes(lesson.Lesson)) {
                    lessonsArray.push(lesson.Lesson)
                    data.push({
                        Lesson: lesson.Lesson,
                        Marks: [lesson.Mark]
                    })
                } else {
                    data.forEach(el => {
                        if (el.Lesson === lesson.Lesson)
                            return el.Marks.push(lesson.Mark)
                    })
                }
            })
            setMarks(data)
            console.log(marks)
        }, (error)=>{
            console.log(error);
        })

        const getStudents = onSnapshot(collection(db,"Users"), (snapshot) =>{
            let res = []
            snapshot.docs.forEach((doc) =>{
                if(auth.currentUser?.uid === doc.data().userUid){
                    setRole(doc.data().role)
                }
                if(doc.data().role === "user"){
                    res.push(doc.data())
                }
            });
            setStudents(res)
        }, (error)=>{
            console.log(error);
        })

        const getSchool = onSnapshot(collection(db,"School"), (snapshot) =>{
            let res = []
            snapshot.docs.forEach((doc) =>{
                res.push(doc.data())
            });
            setSchools(res)
        }, (error)=>{
            console.log(error);
        })

        const getClass = onSnapshot(collection(db,"Class"), (snapshot) =>{
            let res = []
            snapshot.docs.forEach((doc) =>{
                res.push(doc.data())
            });
            setClassChildren(res)
        }, (error)=>{
            console.log(error);
        })

        return() =>{
            getStudents();
            getSchool();
            getClass();
            getMarks();
        }
    }, []);

    const handleUpdateMark = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        const db = firebase.firestore();
        const marksRef = db.collection('Marks')

        console.log(selectedStudent)

        marksRef.add({
            Lesson: selectedLesson,
            Mark: selectedMark,
            UserID: selectedStudent.userUid
        })
    };

    function getIdSchool(number) {
        let result = "";
        schools.forEach(el => {if(el.number === number) return result = el.schoolID})

        return result
    }

    function getIdClass(number) {
        let result = "";

        classChildren.forEach(el => {if(el.numberClass === number)  {
            return result = el.classID
        }})

        return result
    }

    function getMarkInTable(index) {
        let res = ""
        marks[index].Marks.forEach(mark => res += mark.toString() + " ")
        return res
    }

    return (
        <div>
            <Header/>
            <Container className={"d-flex w-100 flex-column justify-content-center my-4"}>
                <h1 className={'mb-3'}>Оценки</h1>

                {role && role === 'user' ? (
                    // Разметка для ученика
                    <div className={'w-100'}>
                        <h2>Ваши оценки</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Оценки</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marks.map((mark, index) => (
                                    <tr key={index}>
                                        <td>{mark.Lesson}</td>
                                        <td>{getMarkInTable(index)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : role && role === 'teacher' ? (
                    // Разметка для преподавателя
                    <div>
                        <h2>Добавить оценку</h2>
                        <div className={'d-flex my-3'}>
                            <select
                                className="form-select mx-2"
                                value={selectedSchoolNumber}
                                onChange={(e) => setSelectedSchoolNumber(e.target.value)}
                            >
                                <option selected value="">Выберите номер школы</option>
                                {schools.map(school => <option>{school.number}</option>)}
                            </select>
                            <select
                                className="form-select mx-2"
                                value={selectedClassNumber}
                                onChange={(e) => setSelectedClassNumber(e.target.value)}
                            >
                                <option value="">Выберите номер класса</option>
                                {classChildren.map(classChildren => (classChildren.numberSchool === getIdSchool(selectedSchoolNumber)) ? <option>{classChildren.numberClass}</option> : getIdSchool(selectedSchoolNumber)) }
                            </select>
                            <Dropdown className="dropdown-modal">
                                <Dropdown.Toggle>{selectedStudent ? selectedStudent.name : 'Выберите студента'}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {students.map(students => (
                                        students.classnumber === getIdClass(selectedClassNumber) ?
                                        <Dropdown.Item
                                            onClick={() => setSelectedStudent(students)}
                                            key={students.userUid}
                                        >
                                            {students.name}
                                        </Dropdown.Item> : null
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className={'d-flex my-3'}>
                            <input onChange={(e) => setSelectedLesson(e.target.value)} className={'form-control mx-2'} placeholder={"Введите название предмета"}/>
                            <select
                                className="form-select mx-2"
                                value={selectedMark}
                                onChange={(e) => setSelectedMark(e.target.value)}
                            >
                                <option value="">Оценка</option>
                                {[1, 2, 3, 4, 5].map(mark => <option>{mark}</option>)}
                            </select>
                        </div>
                        <button className="btn btn-secondary mx-2" onClick={() => handleUpdateMark()}>
                            Поставить оценку
                        </button>
                    </div>
                ) : (
                    // Разметка для неавторизованного пользователя
                    <div>Пожалуйста, авторизуйтесь</div>
                )}
            </Container>
        </div>
    );
}
    export default MarksPage;