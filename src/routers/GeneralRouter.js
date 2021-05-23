import React from 'react'
import { Route, Switch } from 'react-router'
import HomeScreen from '../modules/general/screens/HomeScreen'
import LoginScreen from '../modules/general/screens/LoginScreen'
import RegisterScreen from '../modules/general/screens/RegisterScreen'

const GeneralRouter = () => {
    return (
        <Switch>
            <Route path="/login"><LoginScreen /></Route>
            <Route path="/register"><RegisterScreen /></Route>
            <Route path="/"><HomeScreen /></Route>
        </Switch>
    )
}

export default GeneralRouter
