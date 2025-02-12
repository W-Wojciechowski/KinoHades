import React, {useEffect, useState} from 'react'
import Header from "../Head";
import {useLS} from "../utils/useLS";
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom";
import {fetchService} from "../utils/fetchService";


export default function CreateAccount() {

    const [token, setToken] = useLS("","token");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [popupOut, setPopupOut] = useState(false);

    function CreateNew() {
        const reqBody = {
            userName: username,
            password: password,
            firstName: name,
            lastName: lastname,
            email: email
        };
        if(username.length !== 0 && password.length !== 0 && name.length !== 0 && lastname.length !== 0  && email.search('.*@.*') === 0){
            fetchService(`/api/user`,"post","temp",reqBody)
                .then((userData) => {
                    console.log(userData);
                    setToken(null);
                    window.location.href="/Log"
                })
        }
        else{
            setPopupOut(true)
        }

    }

    function Popup() {
        return(
            <div className="popup-box">
                <div className="popup-content">
                    <button className="close-popup" onClick={() => setPopupOut(false)}>X</button>
                    Wprowadzono błędne dane, spróbuj ponownie
                </div>
            </div>
        )
    }

    return (
            <div className="banner">
                <Header />
                <div className="content">
                    <div className="box">
                        <p>Stwórz Konto</p>
                        <form>
                            <div> <label htmlFor="username">Login</label> </div>
                            <input id="username" type="text" name="username"
                                   value={username} onChange={(e) => setUsername(e.target.value) }/>
                            <div> <label htmlFor="password">Hasło</label> </div>
                            <input id="password" type="password" name="password"
                                   value={password} onChange={(e) => setPassword(e.target.value) } /><br/>
                            <div> <label htmlFor="username">Email</label> </div>
                            <input id="email" type="text" name="email"
                                   value={email} onChange={(e) => setEmail(e.target.value) } /><br/>
                            <div> <label htmlFor="username">Imię</label> </div>
                            <input id="name" type="text" name="name"
                                   value={name} onChange={(e) => setName(e.target.value) } /><br/>
                            <div> <label htmlFor="username">Nazwisko</label> </div>
                            <input id="lastname" type="text" name="lastname"
                                   value={lastname} onChange={(e) => setLastname(e.target.value) } /><br/>
                            <button id="submit" type="button" onClick={() => CreateNew()}>Stwórz nowe konto</button>
                            {popupOut && (<Popup />)}

                        </form>
                    </div>
                </div>
            </div>
    )
}
