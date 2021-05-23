import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AsideUser from '../components/AsideUser';
import HeaderUser from '../components/HeaderUser';
import { Route, Switch } from 'react-router';
import ListTaskUser from '../components/ListTaskUser';
import ListEventUser from '../components/ListEventUser';
import { getUsers } from '../../../services/general/UserService';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const MainUserScreen = () => {

    const [user, setUser] = React.useState([]);

    React.useEffect(()=>{
        getUsers().then(rpta => {
            console.log(rpta);
            setUser(rpta);
        })
    }, [])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <HeaderUser></HeaderUser>
            <AsideUser></AsideUser>
            <main className={classes.content}>
                <Switch>
                    <Route path="/user/tasks"><ListTaskUser></ListTaskUser></Route>
                    <Route path="/user/events"><ListEventUser></ListEventUser></Route>
                </Switch>
            </main>
        </div>
    )
}

export default MainUserScreen
