import React, { useEffect } from 'react'
import { Box, Button, FormControl, InputLabel, makeStyles, Select, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { getCategoryEvents, addEventByUser, updateEventByUser } from '../../../services/EventService';
import { NoteTwoTone } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const FormEventUser = ({ ...props }) => {

    const classes = useStyles();

    const [event, setEvent] = React.useState({
        action: props.action,
        data: {
            title_event: "",
            description_event: "",
            place_event: "",
            date_event: "",
            eventCategory: "",
            id_user: props.idUser
        }
    })

    const [categoryEvents, setCategoryEvents] = React.useState([]);

    useEffect(() => {
        getCategoryEvents()
            .then(rpta => setCategoryEvents(rpta))
    }, [])

    useEffect(() => {
        if (props.action == "update") {
            setEvent((prevEvent) => ({
                action: props.action,
                data: {
                    ...props.dataEvent
                }
            }))
        }
        else {
            setEvent(({
                action: props.action,
                data: {
                    title_event: "",
                    description_event: "",
                    place_event: "",
                    date_event: "",
                    eventCategory: "",
                    id_user: props.idUser
                }
            })
            )
        }
    }, [props.dataEvent, props.action])

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        switch (event.action) {
            case "create":
                addEventByUser(event.data)
                    .then(rpta => props.refreshData());
                props.closeForm();

                break;

            case "update":
                updateEventByUser(event.data)
                    .then(rpta => props.refreshData());
                props.closeForm();
                break;
        }
    }

    const handleInputTask = (e) => {
        const { id, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            data: {
                ...prevEvent.data,
                [id]: value
            }
        }));
    }

    const closeForm = () => {
        setEvent({
            action: props.action,
            data: {
                title_event: "",
                description_event: "",
                place_event: "",
                date_event: "",
                eventCategory: "",
                id_user: props.idUser
            }
        })
        props.closeForm();
    }

    const showData = () => {
        console.log(event)
    }

    return (
        <Box boxShadow={4} border={1} borderRadius={15} padding={2} marginBottom={2} borderColor="lightgray">
            <form onSubmit={handleSubmitEvent}>
                <Typography variant="h6" gutterBottom>
                    Formulario de Evento
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="title_event"
                            name="titulo"
                            label="Nombre del Evento"
                            value={event.data.title_event}
                            fullWidth
                            required
                            onChange={handleInputTask}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="description_event"
                            name="descripcion"
                            label="Descripcion corta del evento"
                            value={event.data.description_event}
                            fullWidth
                            required
                            onChange={handleInputTask}
                        />
                    </Grid>
                    <Grid container xs={12} alignContent="center" justify="center">
                        <Grid item xs={4} alignContent="center" justify="center">
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel htmlFor="filled-age-native-simple">Categoria</InputLabel>
                                <Select
                                    native
                                    id="eventCategory"
                                    value={event.data.eventCategory}
                                    onChange={handleInputTask}
                                    required
                                >

                                    <option aria-label="None" value="" />
                                    {categoryEvents.map(catEve => {
                                        return (<option value={catEve.id}>{catEve.title_event_category}</option>);
                                    })}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} alignContent="center">
                            <TextField
                                required
                                id="place_event"
                                name="descripcion"
                                label="Lugar del evento"
                                value={event.data.place_event}
                                required
                                onChange={handleInputTask}
                            />
                        </Grid>
                        <Grid item xs={4} alignContent="center">
                            <TextField
                                required
                                type="date"
                                id="date_event"
                                name="descripcion"
                                label="Fecha del evento"
                                value={event.data.date_event}
                                required
                                onChange={handleInputTask}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <span disabled={props.action == "create" ? false : true} hidden={props.action == "create" ? false : true}>
                            <Button type="submit" variant="contained" color="primary">
                                Aceptar
                </Button>
                        </span>
                        <span disabled={props.action == "update" ? false : true} hidden={props.action == "update" ? false : true}>
                            <Button type="submit" variant="contained" color="secondary">
                                Actualizar
                </Button>
                        </span>
                        <Button margin={2} variant="contained" color="primary" onClick={closeForm}>
                            Cancelar
            </Button>
                        <Button onClick={showData}>
                            Show me
            </Button>
                    </Grid>
                </Grid>
            </form>
        </ Box >
    )
}

export default FormEventUser
