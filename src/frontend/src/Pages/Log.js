import React, {useState} from 'react'
import Header from "../Head";
import {Link} from "react-router-dom";
import {useLS} from "../utils/useLS";
import jwt_decode from "jwt-decode";

export default function Log() {

    const [token, setToken] = useLS("","token");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function Logging() {
        const reqBody = {
            username: username,
            password: password
        };

        fetch("api/auth/login",{
            headers:{
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(reqBody),
        }).then((response) => {
            if (response.status === 200)
               return  Promise.all([response.json(), response.headers]);
            else
               return  Promise.reject("Invalid login");
        })
            .then(( [body,headers] ) => {
                setToken( headers.get('authorization') );
                const decodedToken = jwt_decode(headers.get('authorization'));
                if(decodedToken.authority[0] === "ROLE_ADMIN"){
                    window.location.href = "/HomeAdmin"
                }
                else{
                    window.location.href = "/"
                }
            }).catch((mess)=>{
            alert(mess)
        })

    }

    return (
        <div className="banner">
            <Header />
            <div className="content">

                <div className="box">
                    <p>Logowanie</p>
                    <div> <label htmlFor="username">Login</label> </div>
                    <input id="username" type="text" name="username"
                           value={username} onChange={(e) => setUsername(e.target.value) }/>
                    <div> <label htmlFor="password">Hasło</label> </div>
                    <input id="password" type="password" name="password"
                           value={password} onChange={(e) => setPassword(e.target.value) } /><br/>
                    <button id="button"  onClick={() => Logging()}>ZALOGUJ SIĘ</button>
                    <button id="reminder" ><Link to="/PassReminder">Zmień hasło</Link></button>
                    <button id="button"><Link to="/CreateAccount">Stwórz konto</Link></button>

                </div>
            </div>
        </div>
    )
}
