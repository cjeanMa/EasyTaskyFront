import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import '../../assets/global.css'
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    return (
        <div className={"base"}>

            <h1> Easy Tasky</h1>
            <h2> tareas y Eventos</h2>

            <h3> Registrate y Descubre nuestra app</h3>
            <h3> </h3>

            <div className="container">
                <Link to="/register" className={"btn btn1"}>
                    <button className="btn btn1"> Registrate </button>
                </Link>
                <Link to="/login" className={"btn btn1"}>
                    <button className="btn btn1"> Inicia Sesion </button>
                </Link>

            </div>

        </div>
    )
}

export default HomeScreen
