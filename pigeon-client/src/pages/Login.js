import './Login.css';
import '../helpers/auth.js'
import { signIn, signUp } from '../helpers/auth.js';
import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }
    
    handleSubmit(event) {
        console.log(this.state.email + ', ' + this.state.password)
        signUp(this.state.email, this.state.password);  
        event.preventDefault();
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>
                Email
                <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
            </label>
            <label>
                Password
                <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
            </label>
            <input type="submit" value="Sign Up" />
            </form>
        );
    }
} 
export default Login;
    