import { auth, db } from '../UI/FirebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import {Link, useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import { Zoom, Navigation, Pagination } from "swiper";
import {collection, onSnapshot, } from "firebase/firestore";
import Header from "../UI/Header";

const Home = () => {

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [role, setRole] = useState(false)

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/hello");
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

    return (
        <div>
            <Header/>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                zoom={true}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Zoom, Navigation, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="swiper-zoom-container">
                        <img src="https://aybschool.am/filemanager/static/uploads/ayb_photo/ARAM0389-min.jpg" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-zoom-container">
                        <img src="https://static.tildacdn.com/tild6134-3235-4032-a263-316365383465/Vypuskniki-1-1024x67.jpg" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-zoom-container">
                        <img src="https://vedtver.ru/wp-content/uploads/2022/05/IMG_1333-scaled.jpg" />
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Home;