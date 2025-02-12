import React, {useEffect, useState} from 'react'
import Header from "../Head";
import {useLS} from "../utils/useLS";
import {fetchService} from "../utils/fetchService";


export default function PassReset() {
    const user = window.location.href.split("/PassReset/")[1];

    const [token, setToken] = useLS("","token");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");


    function ResetPass() {

        if(passwordOne !== passwordTwo){
            console.log("wprowadzono nie to samo hasło")
        }else{
            fetchService(`/api/user/${user}`,"get","temp")
                .then((userData) => {
                    console.log(userData);
                    fetchService(`/api/user/${user}`,"put","temp",passwordOne)
                        .then((userData) => {
                            console.log(userData);
                            window.location.href="../Log"
                        })
                })
        }



    }

    return (
            <div className="banner">
                <Header />
                <div className="content">
                    <div className="box">
                        <p>Zresetuj Hasło</p>
                        <form>
                            <div> <label htmlFor="password">Hasło</label> </div>
                            <input id="password" type="password" name="password"
                                   value={passwordOne} onChange={(e) => setPasswordOne(e.target.value) } /><br/>
                            <div> <label htmlFor="repeat password">Powtórz Hasło</label> </div>
                            <input id="name" type="password" name="name"
                                   value={passwordTwo} onChange={(e) => setPasswordTwo(e.target.value) } /><br/>
                            <button id="submit" type="button" onClick={() => ResetPass()}>Zmień hasło</button>
                        </form>
                    </div>
                </div>
            </div>
    )
}
