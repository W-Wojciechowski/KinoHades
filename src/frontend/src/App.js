import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import {useEffect, useState} from "react";
import {useLS} from "./utils/useLS";
import jwt_decode from 'jwt-decode';
import HomeClient from './Pages/HomeClient';
import HomeAdmin from './Pages/HomeAdmin';
import Contact from "./Pages/Contact";
import Log from "./Pages/Log";
import BookAdmin from "./Pages/BookAdmin";
import Account from "./Pages/Account";
import ReservationViewAdmin from "./Pages/ReservationViewAdmin";
import HomeGuest from './Pages/HomeGuest';
import BookGuest from './Pages/BookGuest';
import PassReminder from './Pages/PassReminder';
import PrivateRoute from "./utils/PrivateRoute";
import BookClient from "./Pages/BookClient";
import ReservationViewClient from "./Pages/ReservationViewClient";
import ReservationViewGuest from "./Pages/ReservationViewGuest";
import PassReset from "./Pages/PassReset";
import CreateAccount from "./Pages/CreateAccount";
import AddRoom from "./Pages/AddRoom";

function App() {

    const [token, setToken] = useLS("","token");
    const [role, setRole] = useState(getRoleFromToken());


    function getRoleFromToken() {
        if (token) {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken.authority[0])
            console.log(decodedToken.sub)
            return decodedToken.authority[0]
        }
        return null
    }
    useEffect( () =>{
        console.log(`Token is: ${token}`);
    },[token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><HomeClient /></PrivateRoute>} />
        <Route path="/HomeAdmin" element={<PrivateRoute><HomeAdmin /></PrivateRoute>} />
        <Route path="/HomeGuest" element={<HomeGuest />} />
        <Route path="/Contact" element={ <Contact />} />
        <Route path="/Log" element={<Log />} />
        <Route path="/PassReminder" element={<PassReminder />} />
        <Route path="/PassReset/:user" element={<PassReset/>} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/Account" element={<PrivateRoute><Account /></PrivateRoute> } />
        <Route path="/AddRoom" element={<PrivateRoute><AddRoom /></PrivateRoute> } />
        <Route path="/BookAdmin" element={<PrivateRoute><BookAdmin /></PrivateRoute> } />
        <Route path="/BookClient" element={<PrivateRoute><BookClient /></PrivateRoute> } />
        <Route path="/BookGuest" element={<BookGuest /> } />
        <Route path="/reservations/:id" element={<PrivateRoute><ReservationViewAdmin /></PrivateRoute>}/>
        <Route path="/reservationsClient/:id" element={<PrivateRoute><ReservationViewClient /></PrivateRoute>}/>
        <Route path="/reservationsGuest/:id" element={<ReservationViewGuest />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
