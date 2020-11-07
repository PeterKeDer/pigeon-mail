import "./Login.css";
import "../helpers/auth.js"
import { signIn, signUp } from "../helpers/auth.js";
import React from "react";

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: "", password: "", passwordConfirm: ""};
    
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
    handleChangePasswordConfirm(event) {
        this.setState({passwordConfirm: event.target.value});
    }
    
    handleSubmit(event) {
        console.log(this.state.email + ", " + this.state.password + ", " + this.state.passwordConfirm);
        signIn(this.state.email, this.state.password); 
        event.preventDefault();
    }

    verifyInputs() {
        return (this.state.email.length > 0) && (this.state.password > 0) && (this.state.passwordConfirm > 0) && (this.state.password == this.state.passwordConfirm);
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
                <label>
                    Confirm Password
                    <input type="text" value={this.state.password} onChange={this.handleChangePasswordConfirm} />
                </label>
                <input type="submit" value="Sign Up" disabled={!this.verifyInputs}/>
            </form>
        );
    }
} 
export default Signup;