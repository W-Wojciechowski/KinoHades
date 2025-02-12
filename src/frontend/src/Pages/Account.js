import React, {useEffect, useState} from 'react'
import Header from "../Head";
import {useLS} from "../utils/useLS";
import {Link, Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {fetchService} from "../utils/fetchService";

export default function Account() {
    const [token, setToken] = useLS("","token");
    const [chairList, setChairList] = useState(null);

    const decodedToken = jwt_decode(token);

    useEffect( () =>{
        fetchService(`/api/chairs`,"get",token)
            .then((chairsData) => {
                console.log(chairsData);
                setChairList(chairsData)
            })
    },[])


    function cancelReservation(currReservedChair) {
        fetchService(`/api/chairs/cancel/${currReservedChair.id}`,"put",token,currReservedChair)
            .then(() => {
                    window.location.href="Account"
            })


    }

    return (
        <div className="banner_fixed">
            <Header />
            <div className="container">

                <div className="header">Nazwa użytkownika:  {decodedToken.sub}</div>
                <div className="header">Lista rezerwacji: </div>

                {chairList && chairList.length === 0 ? (
                    <div className="header">
                        <p>Nie masz jeszcze żadnych rezerwacji</p>
                    </div>) : ( <></> )}

                {chairList ? ( chairList.map((currReservedChair) =>
                    <div key={currReservedChair.id} className="header">
                        <p>{currReservedChair.reservation.movieName} -  Godzina: {currReservedChair.reservation.startHour} </p>
                        <p>Siedzenie: rząd - {currReservedChair.row}  miejsce - {currReservedChair.col}</p>
                        <button onClick={ () => cancelReservation(currReservedChair)}>Odwołaj rezerwacje</button>
                    </div>)) : ( <></> )}

            </div>
        </div>
    )
}
