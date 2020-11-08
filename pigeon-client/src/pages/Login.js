import "./Login.css";
import "../helpers/auth.js"
import { signIn, signUp } from "../helpers/auth.js";
import React from "react";
import {connect, Redirect} from "react-router-dom";
import {getUserId} from "../redux/selectors.js";

class Login extends React.Component {

    constructor(props) {
        if (props.userId !== null) {
            <Redirect to=""/>
        }

        super(props);
        this.state = {email: "", password: ""};
    
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
        console.log(this.state.email + ", " + this.state.password)
        signIn(this.state.email, this.state.password);  
        event.preventDefault();
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email
                        <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
                    </label>
                    <label>
                        Password
                        <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
                    </label>
                    <input type="submit" value="Sign In" />
                </form>
                
                <Link to="/signup">Don"t have an account? Sign up here</Link>
            </div>
        );
    }
} 
// export default Login;
const mapStateToProps = (state) => {
    return {
        userId: getUserId(state)
    }
}

return connect(mapStateToProps)(Login);
    