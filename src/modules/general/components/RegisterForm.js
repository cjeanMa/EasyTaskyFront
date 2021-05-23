import React from 'react'

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

    return (
        <Container maxWidth="sm">
            <Box border={1} borderColor="primary.main" boxShadow={5} p={5} mt={5}>
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
                            <Input id="nombres" aria-describedby="helper-nombre" />
                            <FormHelperText id="helper-nombre">Ingresa tu nombre completo</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth="true">
                            <InputLabel htmlFor="apellidos">Apellidos:</InputLabel>
                            <Input id="apellidos" aria-describedby="helper-apellido" />
                            <FormHelperText id="helper-apellido">De preferencia los dos apellidos</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth="true">
                            <InputLabel htmlFor="correo">Correo Electronico:</InputLabel>
                            <Input id="correo" aria-describedby="helper-correo" type="email"/>
                            <FormHelperText id="helper-correo">No compartiremos tu correo.</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth="true">
                            <InputLabel htmlFor="celular">Numero de Celular:</InputLabel>
                            <Input id="celular" aria-describedby="helper-celular" />
                            <FormHelperText id="helper-celular">Es un dato opcional</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth="true">
                            <InputLabel htmlFor="username">Nombre de Usuario</InputLabel>
                            <Input id="username" aria-describedby="helper-username" />
                            <FormHelperText id="helper-username"></FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth="true">
                            <InputLabel htmlFor="password">Contraseña:</InputLabel>
                            <Input id="password" aria-describedby="helper-password" type="password"/>
                            <FormHelperText id="helper-password">Intenta hacer una constraseña segura</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth="true">
                            <InputLabel htmlFor="confPassword">Confirmar Contraseña:</InputLabel>
                            <Input id="confPassword" aria-describedby="helper-confPassword" type="password"/>
                            <FormHelperText id="helper-confPassword">Repite tu contraseña</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} fullwidth="true">
                        <div className={classes.centering}>
                            <Button variant="contained" color="primary">
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
            </Box>
        </Container >

    )
}

export default RegisterForm
