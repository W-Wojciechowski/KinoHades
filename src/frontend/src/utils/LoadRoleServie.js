import React, {useState} from 'react';
import {useLS} from "./useLS";
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom";

const LoadRoleService = ({children}) => {
    const [token, setToken] = useLS("","token");
    const [role, setRole] = useState(getRoleFromToken());

    function getRoleFromToken() {
        if (token) {
            const decodedToken = jwt_decode(token);
            return decodedToken.authority[0]
        }
        return null
    }

    const GetLogoutButton = () =>    {
        return             <button onClick={ ()=>{
                                setToken(null)
                                window.location.href = "/Log"
                            }}>Wyloguj się</button>
    }

    if (token === null) {
        return   <ul>
            <li><Link to="/HomeGuest">Strona Startowa</Link></li>
            <li><Link to="/Log">Logowanie</Link></li>
            <li><Link to="/BookGuest">Repertuar</Link></li>
            <li><Link to="/Contact">Kontakt</Link></li>
            <GetLogoutButton/>
                </ul>
    }
    else if (role === "ROLE_ADMIN") {
        return   <ul>
            <li><Link to="/HomeAdmin">Strona Startowa</Link></li>
            <li><Link to="/Log">Logowanie</Link></li>
            <li><Link to="/BookAdmin">Repertuar</Link></li>
            <GetLogoutButton/>
                </ul>
    }
    else{
        return   <ul>
            <li><Link to="/">Strona Startowa</Link></li>
            <li><Link to="/Log">Logowanie</Link></li>
            <li><Link to="/BookClient">Repertuar</Link></li>
            <li><Link to="/Account">Konto</Link></li>
            <li><Link to="/Contact">Kontakt</Link></li>
            <GetLogoutButton/>
                </ul>
    }

};
export default LoadRoleService;