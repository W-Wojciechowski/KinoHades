import React, {useEffect, useState} from 'react'
import Header from "../Head";
import {useLS} from "../utils/useLS";
import {Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function HomeClient() {

    const [token, setToken] = useLS("","token");

    return (
        <div className="App">
            <div className="banner">
                <Header />
                <div className="content">
                    <h1>WITAJ  NA STRONIE KINA HADES</h1>
                    <p>Jesteś zalogowany jako administrator strony</p>
                </div>
            </div>
        </div>
    )
}
