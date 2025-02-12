import React, {useState} from 'react'
import Header from "../Head";
import {Link} from "react-router-dom";
import {useLS} from "../utils/useLS";
import jwt_decode from "jwt-decode";
import {fetchService} from "../utils/fetchService";

export default function PassReminder() {
    const [localEmail, setLocalEmail] = useState("");
    const [popupOut, setPopupOut] = useState(false);

    function Popup() {
        return(
            <div className="popup-box">
                <div className="popup-content">
                    <button className="close-popup" onClick={() => setPopupOut(false)}>X</button>
                    Tego adresu email nie ma w bazie danych
                </div>
            </div>
        )
    }

    function SendEmail() {
        if(localEmail !== ""){

            fetchService(`/api/user/resetEmail`,"post","temp",localEmail)
                .then((res) => {
                        console.log(res)
                    if(res === true) {
                         window.location.href="Log"
                    }
                    else {
                        setPopupOut(true)
                    }
                })
        }
    }

    return (
        <div className="banner">
            <Header />
            <div className="content">
                <div className="box">
                    <p>Wpisz email na który ma zostać wysłany link do zresetowania hasła</p>
                    <input id="email" type="text" name="email"
                           value={localEmail} onChange={(e) => setLocalEmail(e.target.value) }/>
                    <br/>
                    <button id="button"  onClick={() => SendEmail()}>Wyślij email</button>
                    {popupOut && (<Popup />)}
                </div>
            </div>
        </div>
    )
}
