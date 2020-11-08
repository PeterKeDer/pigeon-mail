import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from "./pages/Login"
import Map from "./pages/Map"
import Signup from './pages/Signup';

export default function App() {
    return(
        <Router>
            <div>
                <Switch>

                    <Route exact path="/login" component={Login} />
                    <Route path="/map" component={Map} />
                    <Route path="/signup" component={Signup} />

                </Switch>
            </div>
        </Router>
    );
}