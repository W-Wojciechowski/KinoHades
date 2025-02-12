import React, {useEffect, useState} from 'react'
import Header from "../Head";
import {useLS} from "../utils/useLS";
import {Link} from "react-router-dom";
import {fetchService} from "../utils/fetchService";
import Table from "react-bootstrap/Table";

export default function BookClient() {
    const [token, setToken] = useLS("","token");
    const [reservations, setReservations] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [requestedDate, setRequestedDate] = useState("2023-07-01");


    useEffect( () =>{
        fetchService(`/api/reservations/dateSearch/${requestedDate}`,"get","temp")
            .then((reservationData) => {
                setReservations(reservationData)
            })
    },[])

    function onChangeDate(event) {
        setRequestedDate(event.target.value)
        fetchService(`/api/reservations/dateSearch/${event.target.value}`,"get","temp")
            .then((reservationData) => {
                console.log(reservationData);
                setReservations(reservationData)
            })
    }

    return (
        <div className="banner">
            <Header />
                <div className="container_book_client">
                    <input className="header" type="text" placeholder="Szukaj..."
                           onChange={ (e) => {
                               setSearchTerm(e.target.value)
                           }}/>
                    <div className="header" style={{textAlign: "center"}}>
                        {reservations ? ( <p> Seanse dla dnia: {requestedDate} &nbsp;  <input type={"date"} onChange={event => onChangeDate(event)}/></p> ) : ( <></> )}
                    </div>
                </div>
            <Table striped>
                <thead>
                <tr>
                    <th>Zdjęcie</th>
                    <th>Nazwa filmu</th>
                    <th>Godzina rozpoczęcia</th>
                    <th>Opis</th>
                </tr>
                </thead>
                <tbody>
                {reservations ? ( reservations.filter(
                    (val) => {
                        if (searchTerm === "")
                            return val;
                        else if( val.movieName.toLowerCase().includes(searchTerm.toLowerCase()) )
                            return val;
                    })
                    .sort((a, b) => a.startHour > b.startHour ? 1 : -1)
                    .map((reservation) =>

                    <tr key={reservation.id}>
                        <td>
                            {reservation.imagePath !== '---' ? (
                                <img alt="" src={require('../img/bookImages/' + reservation.imagePath )}  style={{width: 70, height: 70, marginLeft: 30, marginRight:30}}/>
                            )  :( <></> )}
                        </td>
                        <td>{reservation.movieName}</td>
                        <td>{reservation.startHour}</td>
                        <td style={{textTransform: "uppercase"}}>
                            <Link to={`/reservationsGuest/${reservation.id}`}>
                                Podgląd sali
                            </Link>
                        </td>
                    </tr>

                )) : ( <></> )}
                </tbody>
            </Table>
        </div>
    )
}
