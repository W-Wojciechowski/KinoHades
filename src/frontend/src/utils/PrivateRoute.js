import React, {useState} from 'react';
import {useLS} from "./useLS";
import {Navigate} from "react-router-dom"
import {fetchService} from "./fetchService";

const PrivateRoute = ( {children} ) => {
    const [token, setToken] = useLS("","token");
    const [isLoading, setIsLoading] = useState(true);
    const [canPass, setCanPass] = useState(null);

    if (token) {
        fetchService(`/api/auth/validate?token=${token}`, "get", token)
            .then((canPass) => {
                setCanPass(canPass)
                setIsLoading(false)
            });
    }
    else{
        return <Navigate to="/Log"/>;
    }

    return isLoading ? (<div>Loading...</div>) : canPass === true ? (children) :( <Navigate to="/Log"/>);
};
export default PrivateRoute;