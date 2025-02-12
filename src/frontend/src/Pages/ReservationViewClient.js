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
    const id = window.location.href.split("/reservationsClient/")[1];
    const [token, setToken] = useLS("","token");
    const [cinemaRoom, setCinemaRoom] = useState(null);
    const [rowsList, setRowsList] = useState(null);
    const [columnsList, setColumnsList] = useState(null);
    const [reservation, setReservation] = useState({
        movieName: "",
        startHour: "",
        roomName: ""
    });
    const [chairList, setChairList] = useState(null);
    const [chair, setChair] = useState({
        reservation: null,
        status: "Zajęte",
        row: 1,
        col: 1

    });

    var chairsToShow = [ {
        col: 0,
        image: null
    } ]

    var chairsHighlighted = [{
        row: 0,
        col: 0,
    }]

    useEffect( () =>{
        fetchService(`/api/reservations/${id}`,"get",token)
            .then((reservationData) => {
                setReservation(reservationData)
                fetchService(`/api/rooms/name/${reservationData.roomName}`,"get",token)
                    .then((CinemaRoomData) => {
                        setCinemaRoom(CinemaRoomData)
                        fetchService(`/api/chairs/${id}`,"get",token)
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

    function updateChair (prop, value){
        const newRes = {...chair}
        newRes[prop] = value;
        setChair(newRes);
    }
    function findArrayElementByPlace(array, row, col) {
        return array.find((element) => {
            if(element.row === row && element.col === col)
                return element;
        })
    }

    function saveChair() {

        for (let i = 0; i < chairsHighlighted.length; i++) {
            chair.reservation = chairList[0].reservation;
            // chair.status = "Zajęte";
            chair.row = chairsHighlighted[i].row;
            chair.col = chairsHighlighted[i].col;

            const chairToReserve = findArrayElementByPlace(chairList,chair.row,chair.col)
            fetchService(`/api/chairs/${chairToReserve.id}`,"put",token,chair)
                .then((chairData) => {
                    console.log(chairData)
                    if(i === chairsHighlighted.length-1)
                        window.location.href="../Account"
                })
        }

    }

    function removeHighlightedChair(chairToDelete) {

        chairsHighlighted = chairsHighlighted.filter( function(chair) {
                return  chair.col !== chairToDelete.col || chair.row !== chairToDelete.row } )
            }

    const imageClick = (event, col, row) => {
        removeHighlightedChair( {col:0,row:0} )
        if (event.target.src === iconFree) {
            event.target.src = iconRes;
            chairsHighlighted.push( {col,row} )
        }
        else {
            event.target.src = iconFree;
            removeHighlightedChair( {col,row} )
        }

    }

    return (
        <div className="banner_fixed">
            <Header />
            <div className="content">
                <p>{reservation.movieName}</p>
                <p>Godzina rozpoczęcia: {reservation.startHour}</p>
                {reservation.imagePath && reservation.imagePath !== '---' ? (
                    <img alt="" src={require('../img/bookImages/' + reservation.imagePath )}  style={{width: 200, height: 200, marginLeft: 30}}/>
                )  :( <></> )}
                <p style={{fontSize: 15}}>{reservation.description}</p>
                    {chairList ? (
                        chairList.map((currChar) =>
                            {currChar.status === "Wolne" ?  (chairsToShow.push( { col: currChar.col , image:  <img src={iconFree}
                                   onClick={(event) => imageClick(event, currChar.col, currChar.row)} alt="no image" height="50" width="50" /> } ) )
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
                <button onClick={() => saveChair()}>Zatwierdź</button>
            </div>

        </div>
    )
}
