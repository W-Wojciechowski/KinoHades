import './App.css';
import logo from './img/logo.png';
import React, {useState} from 'react';
import {useLS} from "./utils/useLS";
import jwt_decode from "jwt-decode";
import LoadRoleService from "./utils/LoadRoleServie";


export default function Header() {

    const [token, setToken] = useLS("","token");
    const [role, setRole] = useState(getRoleFromToken());

    function getRoleFromToken() {
        if (token) {
            const decodedToken = jwt_decode(token);
            return decodedToken.authority[0]
        }
        return null
    }

        return (
            <div className="navbar">
                <img src={logo} className="logo" alt="logo" />
                <LoadRoleService/>
            </div>

        );
}
