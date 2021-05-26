import React from 'react';
import { useEffect, useContext } from 'react';
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
import { getTasksByUser } from '../../../services/TaskService';
import { getEventsByUser } from '../../../services/EventService';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';


const columns = [
    { label: 'NUM', minWidth: 30 },
    { label: 'EVENTO', minWidth: 100 },
    { label: 'DESCRIPCION', minWidth: 150, },
    { label: 'LUGAR', minWidth: 40, },
    { label: 'FECHA DE EVENTO', minWidth: 40, },
    { label: 'CATEGORIA', minWidth: 50, },
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

    const [events, setEvents] = React.useState([]);

    const context = useContext(AuthContext);

    let contador = 1;

    useEffect(() => {
        getEventsByUser(context.getUserLogued().data.id)
            .then(rpta => setEvents(rpta))
        //getTasksByUser(context)
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeEventsPerPage = (event) => {
        setEventsPerPage(+event.target.value);
        setPage(0);
    };

    const showEvents = () => {
        console.log(events);
    }
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {console.log(events)}
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

                                    <TableCell align = "center">
                                        {contador++}
                                    </TableCell>
                                    <TableCell>
                                        {event.title_event}
                                    </TableCell>
                                    <TableCell>
                                        {event.description_event}
                                    </TableCell>
                                    <TableCell align = "center">
                                        {event.place_event}
                                    </TableCell>
                                    <TableCell align = "center">
                                        {event.date_event}
                                    </TableCell>
                                    <TableCell align = "center">
                                        {event.eventCategory.title_event_category}
                                    </TableCell>
                                    <TableCell align = "center">
                                        <VisibilityIcon color="primary" onClick={showEvents}></VisibilityIcon>
                                        <CreateIcon color="action"></CreateIcon>
                                        <DeleteOutlineIcon color="error"></DeleteOutlineIcon>
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
    );
}

export default ListEventUser
