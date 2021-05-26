import React from 'react';
import { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AuthContext from '../../../context/auth/authContext';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const HeaderUser = () => {

    const context = useContext(AuthContext);

    const classes = useStyles();

    useEffect(()=>{
        if(!context.logeado){
            window.location.pathname = "/"
        }
    },[context.logeado])

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    Easy Tasky - Tasky Manager
                </Typography>
                <div hidden={!context.logeado}>
                    <Button color="inherit" onClick={context.cerrarSesion}> Cerrar Sesion</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderUser