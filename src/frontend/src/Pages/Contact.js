import React from "react";
import Header from "../Head";
import {useLS} from "../utils/useLS";
import Table from 'react-bootstrap/Table';


export default function Contact() {
    const [token, setToken] = useLS("","token");
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    return (
        <div className="banner">
            <Header />
            <Table striped>
                <thead>
                <tr>
                    <th colSpan={3}>KONTAKT</th>
                </tr>
                </thead>
                <tbody>
                <th>
                    <p>Łódź ul. Drewnowska 6</p>
                    <p>godziny otwarcia:</p>
                    <p>Pn -Pt 8:00 - 22:00</p>
                </th>
                <th>
                    <h3>Telefon</h3>
                    <p>Infolinia</p>
                    <p>42 638 90 20</p>
                </th>
                <th>
                    <h3>Email</h3>
                    <p>hadeskontakt@lodz.pl</p>
                </th>
                </tbody>
            </Table>

        </div>

    );
};

