import React, {useEffect, useState} from 'react'
import Header from "../Head";
import {useLS} from "../utils/useLS";
import {fetchService} from "../utils/fetchService";
import iconFree from "../img/chairIconFree.png";
import iconOcc from "../img/chairIconOcc.png";
import ShowHall from "../utils/showHall";
import {forEach} from "react-bootstrap/ElementChildren";

export default function ReservationViewAdmin() {
    const id = window.location.href.split("/reservations/")[1];
    const [token, setToken] = useLS("","token");
    const [imageData, setImageData] = useState(null);
    const [chairList, setChairList] = useState(null);
    const [roomsList, setRoomsList] = useState(null);
    const [cinemaRoom, setCinemaRoom] = useState(null);
    const [rowsList, setRowsList] = useState(null);
    const [columnsList, setColumnsList] = useState(null);
    const [newResFlag, setNewResFlag] = useState(false);
    var chairsToShow = [ {
        col: 0,
        image: null
    } ]
    const [reservation, setReservation] = useState({
        movieName: "",
        startHour: "",
        description: "",
        date: "",
        roomName: "Snickers",
    });

    function updateReservation (prop, value){
        const newRes = {...reservation}
        newRes[prop] = value;
        setReservation(newRes);
    }

    
    function save() {

        if(reservation.roomName === null) {
            updateReservation("roomName", "Snickers")
            console.log(reservation.roomName)
        }
        fetchService(`/api/reservations/${id}`,"put",token,reservation)
            .then((reservationData) => {
                console.log(reservationData)

                const FetchData = {
                    headers:{
                        "Authorization": `Bearer ${token}`
                    },
                    method: "put"
                }
                FetchData.body = imageData
                fetch(`/api/reservations/uploadImg/${id}`,FetchData).then((response) => {
                    if (newResFlag){
                        fetchService(`/api/rooms/name/${reservationData.roomName}`,"get",token)
                            .then((CinemaRoomData) => {
                                const reqChairPack = {
                                    reservation: reservationData,
                                    row_t: 1,
                                    col_t: 1
                                };
                                const max_row = CinemaRoomData.number_rows + 1;
                                const max_col = CinemaRoomData.number_columns + 1;
                                for (let row = 1 ; row < max_row; row++){
                                    for (let col = 1 ; col < max_col; col++){
                                        reqChairPack.row_t = row;
                                        reqChairPack.col_t = col;
                                        fetchService(`/api/chairs`,"post",token,reqChairPack)
                                            .then((chairsData) => {
                                                console.log(chairsData);
                                                if(row === max_row-1 && col === max_col-1)
                                                    window.location.href = "../BookAdmin"
                                            })
                                    }
                                }
                            })
                    }
                    //else
                        //window.location.href = "../BookAdmin"
                })

            })
    }

    useEffect( () =>{
        fetchService(`/api/reservations/${id}`,"get",token)
            .then((reservationData) => {
                console.log(reservationData)
                if (reservationData.movieName === "---") {
                    setNewResFlag(true)
                }
            setReservation(reservationData)
            fetchService(`/api/rooms/all`,"get",token)
                .then((CinemaAllRoomData) => {
                    setRoomsList(CinemaAllRoomData)
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
        })
    },[])

    const handleUploadClick = event => {
        let file = event.target.files[0];
        let formData = new FormData();

        formData.append("file", event.target.files[0]);
        formData.append('properties', new Blob([JSON.stringify({
            "name": "root",
            "password": "root"
        })], {
            type: "application/json"
        }));
        console.log(formData)
        setImageData(formData);

    };

    return (
        <div className="banner_fixed">
            <Header />
            <div className="content">
                <p>Widok seansu nr: {id}</p>
                {chairList ? (
                    chairList.map((currChar) =>
                    {currChar.status === "Wolne" ?  (chairsToShow.push( { col: currChar.col , image:  <img src={iconFree} alt="no image" height="50" width="50" /> } ) )
                        : (chairsToShow.push(  { col: currChar.col , image:   <img src={iconOcc}  alt="no image" height="50" width="50" /> } ) )
                    })
                ) : ( <></> ) }
                <p>Sala:&nbsp;&nbsp;
                    {newResFlag ? (
                        <select style={{padding:0,margin:0}}
                                onChange={ (e) => updateReservation("roomName",e.target.value) }>
                            {roomsList ? ( roomsList.map((room) =>
                                <option key={room.id} value={room.name}>{room.name} - {room.number_rows * room.number_columns} miejsc</option>
                            )) : ( <option>---</option> )}
                        </select>
                    ) : ( <>{reservation.roomName} </> ) }
                </p>
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
                <p>Nazwa filmu: <input type="text" id="movieName" onChange=
                    { (e) => updateReservation("movieName",e.target.value) } value={reservation.movieName}/></p>
                <p>Godzina rozpoczęcia: <input type="text" id="startHour" onChange=
                    { (e) => updateReservation("startHour",e.target.value) } value={reservation.startHour}/></p>
                <p>Opis filmu: <input type="text" style={{width: 300}} id="desc" onChange=
                    { (e) => updateReservation("description",e.target.value) } value={reservation.description}/></p>
                <p>Data seansu (rrrr-mm-dd): <input type="text"  id="date" onChange=
                    { (e) => updateReservation("date",e.target.value) } value={reservation.date}/></p>

                <input
                    accept="image/*"
                    id="upload-profile-image"
                    type="file"
                    onChange={handleUploadClick}
                />

                <button onClick={() => save()}>Zatwierdź</button>

            </div>
        </div>
    )
}
