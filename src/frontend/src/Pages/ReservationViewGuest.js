import React, {useEffect, useState} from 'react'
import Header from "../Head";
import iconFree from '../img/chairIconFree.png';
import iconOcc from '../img/chairIconOcc.png';
import iconRes from '../img/chairIconRes.png';
import {useLS} from "../utils/useLS";
import {fetchService} from "../utils/fetchService";
import {Link} from "react-router-dom";
import {MenuList} from "@material-ui/core";
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";
import ShowHall from "../utils/showHall";


export default function ReservationViewClient() {
    const id = window.location.href.split("/reservationsGuest/")[1];
    const [token, setToken] = useLS("","token");
    const [cinemaRoom, setCinemaRoom] = useState(null);
    const [rowsList, setRowsList] = useState(null);
    const [columnsList, setColumnsList] = useState(null);
    const [reservation, setReservation] = useState({
        movieName: "",
        startHour: ""
    });
    const [chairList, setChairList] = useState(null);

    var chairsToShow = [ {
        col: 0,
        image: null
    } ]

    useEffect( () =>{
        fetchService(`/api/reservations/${id}`,"get","temp")
            .then((reservationData) => {
                setReservation(reservationData)
                fetchService(`/api/rooms/name/${reservationData.roomName}`,"get","temp")
                    .then((CinemaRoomData) => {
                        setCinemaRoom(CinemaRoomData)
                        fetchService(`/api/chairs/${id}`,"get","temp")
                            .then((chairData) => {
                                setChairList(chairData)
                                const rows = [];
                                const columns = [];
                                for (let i = 1; i <= CinemaRoomData.number_rows; i++) {
                                    rows.push(i);
                                }
                                for (let i = 1; i <= CinemaRoomData.number_columns; i++) {
                                    columns.push(i);
                                }
                                setRowsList(rows)
                                setColumnsList(columns)
                            })
                    })
            })
    },[])

    return (
        <div className="banner_fixed">
            <Header />
            <div className="content">
                <p>{reservation.movieName}</p>
                <p>Godzina rozpoczęcia: {reservation.startHour}</p>
                {reservation.imagePath && reservation.imagePath !== '---' ? (
                    <img alt="" src={require('../img/bookImages/' + reservation.imagePath )}  style={{width: 200, height: 200, marginLeft: 30}}/>
                )  :  ( <></> )}
                <p style={{fontSize: 15}}>{reservation.description}</p>
                <br/>
                    {chairList ? (
                        chairList.map((currChar) =>
                            {currChar.status === "Wolne" ?  (chairsToShow.push( { col: currChar.col , image:  <img src={iconFree} alt="no image" height="50" width="50" /> } ) )
                                : (chairsToShow.push(  { col: currChar.col , image:   <img src={iconOcc}  alt="no image" height="50" width="50" /> } ) )
                            })
                    ) : ( <></> ) }
                <p>Sala:&nbsp;&nbsp;{reservation.roomName}</p>
                {columnsList ? (
                    <div style={{letterSpacing: 41, marginLeft: 34}}>
                        {columnsList.map((columnNumber) => (
                            columnNumber
                        ))}
                    </div>
                ) : ( <></> ) }
                {chairsToShow && rowsList && columnsList ? (
                    <div>
                        {rowsList.map((rowNumber) => (
                            <ShowHall chairs={chairsToShow} rowNumber={rowNumber} columnsList={columnsList}/>
                        ))}
                    </div>
                ) : ( <></> ) }
                <br/>
            </div>

        </div>
    )
}
