import "./Login.css";
import "../helpers/auth.js"
import { signIn, signUp } from "../helpers/auth.js";
import {} from "../"
import React from "react";

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: "", password: "", passwordConfirm: "", errorMatchPassword: false};
    
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this);
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
        if (this.verifyInputs()) {
            console.log(this.state.email + ", " + this.state.password + ", " + this.state.passwordConfirm);
            signUp(this.state.email, this.state.password); 
        } else {
            this.setState({ errorMatchPassword: true });
            console.log("passwords do not match");
        }
        event.preventDefault();
    }

    verifyInputs() {
        return (this.state.email.length > 0) && (this.state.password.length > 0) && (this.state.passwordConfirm.length > 0) && (this.state.password === this.state.passwordConfirm);
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
                    <input type="text" value={this.state.passwordConfirm} onChange={this.handleChangePasswordConfirm} />
                </label>
                <input type="submit" value="Sign Up"/>
                {this.state.errorMatchPassword ? <h4>Passwords do not match.</h4> : <></>}
            </form>
        );
    }
} 
export default Signup;