import React, {Component} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Hello from "../pages/Hello";
import SignIn from "../pages/SignIn"
import Reset from "../pages/Reset"
import SignUp from "../pages/SignUp"
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import News from "../pages/News";
import AddNews from "../pages/AddNews";
import MarksPage from "../pages/MarksPage";
import Feedback from "../pages/Feedback";




class AppRouter extends Component {
    render() {
        return (
            <Routes>
                <Route path="/hello" element={<Hello/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<SignIn/>}/>
                <Route path="/reset" element={<Reset/>}/>
                <Route path="/reg" element={<SignUp/>}/>
                <Route path="/profile/:id" element={<Profile/>}/>
                <Route path="/editprofile/:id" element={<EditProfile/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/addNews" element={<AddNews/>}/>
                <Route path="/addNews/:id" element={<AddNews/>}/>
                <Route path="/marks" element={<MarksPage/>}/>
                <Route path="/feedback" element={<Feedback/>}/>
            </Routes>
        );
    }
}

export default AppRouter;