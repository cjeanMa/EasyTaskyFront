import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <AppsIcon />
                </IconButton>
                <Typography variant="h5" className={classes.title}>
                    <Link to="/">Easy Tasky </Link>
                </Typography>
                <Button color="inherit"> <Link to="/" >Home</Link> </Button>
                <Button color="inherit"> <Link to="/register">Registrate</Link></Button>
                <Button color="inherit"> <Link to="/login">Login</Link></Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;