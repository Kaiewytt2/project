import React from 'react';
import Header from "../UI/Header";

const Feedback = () => {
    return (
        <div>
            <Header/>
            <div className={"form-login2"}>
                <div className="login-body">

                    <form target="_blank" action="https://formsubmit.co/wildcatclubnft@gmail.com" method="POST" className="form-horizontal">
                        <span className="heading">ОБРАТНАЯ СВЯЗЬ</span>

                        <div className="form-group">
                            <input type="text" name="name" className="form-control" placeholder="Ваше имя" required/>
                        </div>

                        <div className="form-group">
                            <input type="email" name="email" className="form-control" placeholder="Ваш Email" required/>
                        </div>

                       <div className="form-group">
                            <textarea placeholder="Ваше сообщение" className="form-control" name="message" rows="10" required></textarea>
                       </div>

                        <div className="form-group">

                            <button style={{width: "100%", textDecoration: "none"}} type="submit" className="btn-login btn-default">ОТПРАВИТЬ</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Feedback;