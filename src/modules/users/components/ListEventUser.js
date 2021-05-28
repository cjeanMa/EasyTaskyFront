import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AuthContext from '../../../context/auth/authContext';
import { getEventsByUser, deleteEventByUser } from '../../../services/EventService';
import { Icon } from '@material-ui/core';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { red } from '@material-ui/core/colors';
import FormEventUser from './FormEventUser';


const columns = [
    { label: 'NUM', minWidth: 30 },
    { label: 'EVENTO', minWidth: 100 },
    { label: 'DESCRIPCION', minWidth: 150, },
    { label: 'LUGAR', minWidth: 40, },
    { label: 'FECHA DE EVENTO', minWidth: 40, },
    { label: 'ACCIONES', minWidth: 50, },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '90%',
    },
});

const ListEventUser = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [eventsPerPage, setEventsPerPage] = React.useState(10);

    const [eventUpdate, setEventUpdate] = React.useState({});
    const [events, setEvents] = React.useState([]);
    const [actionEvent, setActionEvent] = React.useState("create");
    const [hideForm, setHideForm] = React.useState(true);

    const context = useContext(AuthContext);

    let contador = 1;

    useEffect(() => {
        getEventsByUser(context.getUserLogued().data.id)
            .then(rpta => setEvents(rpta))
        //getTasksByUser(context)
    }, [])

    const refreshListEvents = () => {
        getEventsByUser(context.getUserLogued().data.id)
            .then(rpta => setEvents(rpta));
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeEventsPerPage = (event) => {
        setEventsPerPage(+event.target.value);
        setPage(0);
    };

    const buttonCreateEvent = () => {
        setHideForm(false);
        setActionEvent("create");
        setEventUpdate({});
    }

    const closeFormEvent = () => {
        setHideForm(true);
        setEventUpdate(null);
    }

    const showUpdateData = (event) => {
        setHideForm(false);
        setActionEvent("update")
        setEventUpdate(event)
    }

    const deleteEvent = (idEvent) => {
        confirmAlert({
            title: 'Eliminar Evento',
            message: 'Realmente quieres borrar este evento?',
            buttons: [
                {
                    label: 'Si',
                    onClick: () => {
                        deleteEventByUser(idEvent)
                            .then(rpta => {
                                refreshListEvents();
                            }
                            )
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    return (
        <div>
            <div hidden={hideForm}>
                <FormEventUser
                    idUser={context.getUserLogued().data.id}
                    action={actionEvent}
                    closeForm={closeFormEvent}
                    dataEvent={eventUpdate}
                    refreshData={() => refreshListEvents()}
                />
            </div>
            <Paper className={classes.root}>
                <Button variant="contained" color="primary" onClick={buttonCreateEvent}>
                    Agregar Evento
                </Button>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        align="center"
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.slice(page * eventsPerPage, page * eventsPerPage + eventsPerPage).map((event) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={event.id}>

                                        <TableCell align="center">
                                            {contador++}
                                        </TableCell>
                                        <TableCell>
                                            {event.title_event}
                                        </TableCell>
                                        <TableCell>
                                            {event.description_event}
                                        </TableCell>
                                        <TableCell align="center">
                                            {event.place_event}
                                        </TableCell>
                                        <TableCell align="center">
                                            {event.date_event}
                                        </TableCell>
                                        <TableCell align="center">
                                            <button border={0} id={event.id} onClick={() => showUpdateData(event)}>
                                            <CreateIcon color="error"></CreateIcon>
                                            </button>
                                            <button onClick={() => deleteEvent(event.id)}>
                                            <DeleteOutlineIcon color="secondary"></DeleteOutlineIcon>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={events.length}
                    rowsPerPage={eventsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeEventPerPage={handleChangeEventsPerPage}
                />
            </Paper>
        </div>
    );
}

export default ListEventUser
