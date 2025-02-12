import React, {useEffect, useState} from 'react'
import Header from "../Head";
import {useLS} from "../utils/useLS";
import {Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {fetchService} from "../utils/fetchService";

export default function HomeClient() {

    const [token, setToken] = useLS("","token");
    const [name, setName] = useState("---");
    const [number_rows, setNumber_rows] = useState(1);
    const [number_columns, setNumber_columns] = useState(1);
    function CreateNewRoom() {
        const reqBody = {
            name: name,
            number_rows: number_rows,
            number_columns: number_columns
        };
        console.log(reqBody);
        fetchService(`/api/rooms`,"post",token,reqBody)
            .then((userData) => {
                console.log(userData);
                window.location.href="/BookAdmin"
            })

    }

    return (
        <div className="App">
            <div className="banner">
                <Header />
                <div className="content">

                    <div className="box">
                        <p>Stwórz nową sale</p>
                            <div> <label htmlFor="name">Nazwa sali</label> </div>
                            <input id="name" type="text" name="name"
                                   value={name} onChange={(e) => setName(e.target.value) }/><br/>
                            <div> <label htmlFor="password">Liczba rzędów</label> </div>
                            <input id="number_rows" type="number" name="number_rows"
                                   value={number_rows} onChange={(e) => setNumber_rows( parseInt(e.target.value)) } /><br/>
                            <div> <label htmlFor="username">Liczba miejsc w rzędzie</label> </div>
                            <input id="number_columns" type="number" name="number_columns"
                                   value={number_columns} onChange={(e) => setNumber_columns(parseInt(e.target.value)) } /><br/>
                            <button id="submit" type="button" onClick={() => CreateNewRoom()}>Stwórz nową sale</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
