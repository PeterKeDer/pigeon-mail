import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from "./pages/Login"
import Map from "./pages/Map"
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard"
import NewMail from "./pages/NewMail"
import MessageView from "./pages/MessageView"

export default function App() {
    return(
        <Router>
            <div>
                <Switch>

                    <Route exact path="/login" component={Login} />
                    <Route path="/map" component={Map} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/newmail" component={NewMail} />
                    <Route path="/messageview" component={MessageView} />

                </Switch>
            </div>
        </Router>
    );
}