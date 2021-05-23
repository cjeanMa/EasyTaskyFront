import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    UseRouteMatch,
    useParams
} from "react-router-dom"
import Header from '../modules/general/components/Header'
import AdminRouter from './AdminRouter'
import GeneralRouter from './GeneralRouter'
import UserRouter from './UserRouter'

const SuperRouter = () => {
    return (
        <div>
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/admin"><AdminRouter/></Route>
                        <Route path="/user"><UserRouter /></Route>
                        <Route path="/"><GeneralRouter /></Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default SuperRouter
