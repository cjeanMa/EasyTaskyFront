import React from 'react'
import {useEffect} from 'react';
import FormControl from '@material-ui/core/FormControl';
import {
    Avatar,
    Box,
    Button,
    Container,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    makeStyles,
    TextField,
    Typography
} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import CopyrightForm from './CopyrightForm';
import { addUser } from '../../../services/UserService';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const useStyles = makeStyles((theme) => ({
    centering: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 5,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    }
}));

const RegisterForm = () => {

    const classes = useStyles();

    const [confPass, setConfPass] = React.useState(false);
    const [repeatPassword, setRepeatPassword] = React.useState("");
    const [dataUser, setDataUser] = React.useState(
        {
            username: "",
            name: "",
            surname: "",
            email: "",
            celphone: "",
            password: "",
        }
    )

    useEffect(()=>{
        if(dataUser.password!= "" || repeatPassword != "")
        {
            if(dataUser.username.password == repeatPassword)
                console.log("Son iguales")
            else
                console.log("aun noson iguales")
        }
    },[repeatPassword])

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        console.log(dataUser);
        addUser(dataUser)
        .then(rpta => {
            confirmAlert({
                title: 'Usuario Creado Satisfactoriamente',
                message: 'Deseas iniciar sesion?',
                buttons: [
                  {
                    label: 'Si',
                    onClick: () => {
                        window.location.pathname = '/login';
                    }
                  },
                  {
                    label: 'No',
                    onClick: () =>{
                        window.location.pathname = '/';
                    }
                  }
                ]
              });
        }) 

    }

    const handleInputRegister = (e) => {
        const { id, value } = e.target;
        setDataUser({
            ...dataUser,
            [id]: value,
        })
    }

    const confirmPassword = () =>{
        console.log(dataUser.password, "//", repeatPassword);
        if(dataUser.password == repeatPassword){
            console.log("ya son iguales")
        }
    }

    const handleRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
        confirmPassword();
    }



    return (
        <Container maxWidth="sm">
            <Box border={1} borderColor="primary.main" boxShadow={5} p={5} mt={5}>
                <form onSubmit={handleSubmitRegister}>
                    <div className={classes.centering}>
                        <Avatar className={classes.avatar}>
                            <EmojiPeopleIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registro de nuevo usuario
                    </Typography>
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth="true">
                                <InputLabel htmlFor="nombres">Nombres:</InputLabel>
                                <Input id="name" value={dataUser.name} onChange={handleInputRegister} aria-describedby="helper-nombre" />
                                <FormHelperText id="helper-nombre">Ingresa tu nombre completo</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth="true">
                                <InputLabel htmlFor="apellidos">Apellidos:</InputLabel>
                                <Input id="surname" value={dataUser.surname} onChange={handleInputRegister} aria-describedby="helper-apellido" />
                                <FormHelperText id="helper-apellido">De preferencia los dos apellidos</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth="true">
                                <InputLabel htmlFor="correo">Correo Electronico:</InputLabel>
                                <Input id="email" value={dataUser.email} onChange={handleInputRegister} aria-describedby="helper-correo" type="email" />
                                <FormHelperText id="helper-correo">No compartiremos tu correo.</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth="true">
                                <InputLabel htmlFor="celular">Numero de Celular:</InputLabel>
                                <Input id="celphone" inputProps={{ maxLength: 9 }} value={dataUser.celphone} onChange={handleInputRegister} aria-describedby="helper-celular" />
                                <FormHelperText id="helper-celular">Es un dato opcional</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth="true">
                                <InputLabel htmlFor="username">Nombre de Usuario</InputLabel>
                                <Input id="username" value={dataUser.username} onChange={handleInputRegister} aria-describedby="helper-username" />
                                <FormHelperText id="helper-username"></FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth="true">
                                <InputLabel htmlFor="password">Contraseña:</InputLabel>
                                <Input id="password" value={dataUser.password} onChange={handleInputRegister} aria-describedby="helper-password" type="password" />
                                <FormHelperText id="helper-password">Intenta hacer una constraseña segura</FormHelperText>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControl fullWidth="true">
                                <InputLabel htmlFor="confPassword">Confirmar Contraseña:</InputLabel>
                                <Input error id="confPassword" value={repeatPassword} onChange={handleRepeatPassword} aria-describedby="helper-confPassword" type="password" />
                                <FormHelperText id="helper-confPassword">Repite tu contraseña</FormHelperText>
                            </FormControl>
                        </Grid> */} 
                        <Grid xs={12} fullwidth="true">
                            <div className={classes.centering}>
                                <Button type="submit" variant="contained" color="primary">
                                    Registrarme
                        </Button>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div className={classes.centering}>
                                <CopyrightForm></CopyrightForm>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container >

    )
}

export default RegisterForm
