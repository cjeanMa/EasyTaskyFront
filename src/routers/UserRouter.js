import React from 'react'
import { Route, Switch } from 'react-router'
import MainUserScreen from '../modules/users/screens/MainUserScreen'

const UserRouter = () => {
    return (
        <Switch>
            <Route path="/user"><MainUserScreen></MainUserScreen></Route>
        </Switch>
    )
}

export default UserRouter
