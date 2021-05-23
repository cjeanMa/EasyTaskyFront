import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const AsideUser = () => {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <Link to="/user/tasks">
                            <ListItem button>
                                <ListItemIcon><ListAltIcon /></ListItemIcon>
                                <ListItemText primary={"Tareas"} />
                            </ListItem>
                        </Link>
                        <Link to="/user/events">
                            <ListItem button>
                                <ListItemIcon><EventNoteIcon /></ListItemIcon>
                                <ListItemText primary={"Eventos"} />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                </div>
            </Drawer>

            <Toolbar />

        </div>
    )
}

export default AsideUser
