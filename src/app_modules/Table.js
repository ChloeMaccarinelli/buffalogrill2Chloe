import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from "@material-ui/core/TablePagination";
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

import './css/Table.css';
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import {Icon} from "@material-ui/core";

export default function TableRestaurant(data) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    if(data.data.restaurants.length === 0) {
        data.data.restaurants = ["Chargement..."];
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function retrieveDataFromServer() {
        let dataRetrieved;
        fetch('http://localhost:8080/api/restaurants')
            .then(response => {
                dataRetrieved = response.json(); // transforme le json texte en objet js
            })
            .then( () => { // data c'est le texte json de response ci-dessus
                dataRetrieved.then(resp => {
                    data.data.restaurants = [];
                    for (let i = 0; i < resp.data.length; i++) {
                        data.data.restaurants.push(resp.data[i]);
                    }
                    setPage(1);
                    setPage(0);
                });
            }).catch(err => {
        });
    }

    function deleteElement(_id) {
        fetch('http://localhost:8080/api/restaurants/' + _id, {
            method: 'delete'
        })
            .then( () => { // data c'est le texte json de response ci-dessus
                retrieveDataFromServer()
            })
            .catch(err => {
        });
    }

    return <TableContainer component={Paper}>
        <Table aria-label="Restaurant table">
            <TableHead>
                <TableRow>
                    <TableCell>Nom du restaurant</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.data.restaurants
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => (
                    <TableRow class="tableRow">
                        <TableCell component="th" scope="row">
                            {row.name}
                            <Button onClick={deleteElement.bind(this,row._id)} variant="contained" color="primary" class="deleteButton" variant="outlined" color="secondary">
                               <DeleteForeverRoundedIcon></DeleteForeverRoundedIcon> </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TablePagination rowsPerPageOptions={[10, 20, 30, 40, 50]}
                             count={data.data.restaurants.length}
                             rowsPerPage={rowsPerPage}
                             page={page}
                             onChangePage={handleChangePage}
                             onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Table>
    </TableContainer>
}
