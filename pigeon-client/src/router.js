import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Login from "./pages/Login"
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard"
import NewMail from "./pages/NewMail"
import MessageView from "./pages/MessageView"

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <Route exact path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/newmail" component={NewMail} />
                    <Route path="/messageview" component={MessageView} />

                </Switch>
            </div>
        </Router>
    );
}