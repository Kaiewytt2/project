import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import '../../App.css'
import { auth, sendPasswordReset } from "../UI/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";


function Reset() {

    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [user, loading]);

    const btnsendpassword = () =>{
        if(email)
        {
            sendPasswordReset(email)
            navigate("/auth")
        }
    }

    return(


        <div className={"form-login"}>
            <div className="login-body">

                <form className="form-horizontal">
                    <span className="heading">ВОССТАНОВЛЕНИЕ ПАРОЛЯ</span>
                    <div className="form-group">
                        <input type="email" className="form-control" id="inputEmail" placeholder="E-mail" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        <i className="fa fa-user"></i>
                    </div>

                    <div className="form-group">


                        <button onClick={btnsendpassword}  style={{width: "100%", textDecoration: "none"}} type="submit" className="btn-login btn-default">ВОССТАНОВИТЬ ПАРОЛЬ</button>
                    </div>
                </form>


            </div>
        </div>

    );
};

export default Reset;