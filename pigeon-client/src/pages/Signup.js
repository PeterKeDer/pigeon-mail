// import "./Login.css";
// import "../helpers/auth.js"
// import { signIn, signUp } from "../helpers/auth.js";
// import {} from "../"
// import React from "react";

// class Signup extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {email: "", password: "", passwordConfirm: "", errorMatchPassword: false};
    
//         this.handleChangeEmail = this.handleChangeEmail.bind(this);
//         this.handleChangePassword = this.handleChangePassword.bind(this);
//         this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
    
//     handleChangeEmail(event) {
//         this.setState({email: event.target.value});
//     }

//     handleChangePassword(event) {
//         this.setState({password: event.target.value});
//     }
//     handleChangePasswordConfirm(event) {
//         this.setState({passwordConfirm: event.target.value});
//     }
    
//     handleSubmit(event) {
//         if (this.verifyInputs()) {
//             console.log(this.state.email + ", " + this.state.password + ", " + this.state.passwordConfirm);
//             signUp(this.state.email, this.state.password); 
//         } else {
//             this.setState({ errorMatchPassword: true });
//             console.log("passwords do not match");
//         }
//         event.preventDefault();
//     }

//     verifyInputs() {
//         return (this.state.email.length > 0) && (this.state.password.length > 0) && (this.state.passwordConfirm.length > 0) && (this.state.password === this.state.passwordConfirm);
//     }
    
//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     Email
//                     <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
//                 </label>
//                 <label>
//                     Password
//                     <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
//                 </label>
//                 <label>
//                     Confirm Password
//                     <input type="text" value={this.state.passwordConfirm} onChange={this.handleChangePasswordConfirm} />
//                 </label>
//                 <input type="submit" value="Sign Up"/>
//                 {this.state.errorMatchPassword ? <h4>Passwords do not match.</h4> : <></>}
//             </form>
//         );
//     }
// } 
// export default Signup;


import "../helpers/auth.js"
import { signIn, signUp, authStateChanged, getCurrentUserId } from "../helpers/auth.js";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserId } from "../redux/selectors.js";
import { setUserId } from "../redux/actions.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import logo from './images/loginLogo.jpg';

const useStyles = makeStyles({
    root: {
        maxWidth: 350,
        // height: 500
    },
    media: {
        height: 275,
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    textFields: {
        paddingBotton: 200
    }
});

function Login(props) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    let history = useHistory();

    function verifyInputs() {
        return (email.length > 0) && (password.length > 0) && (passwordConfirm.length > 0) && (password === passwordConfirm);
    }

    const handleSubmit = (event) => {
        if (verifyInputs()) {
            console.log(email + ", " + password)
            signUp(email, password)
                .then(credentials => {
                    signIn(email, password)
                        .then(credentials => {
                            if (credentials.user.uid !== null) {
                                props.setUserId(credentials.user.uid);
                                console.log("uid: ", credentials.user.uid);
                                history.push("./dashboard");
                            } else {
                                console.log("invalid user");
                            }
                    })
            
                });
        }

        event.preventDefault();
    };
    return (
        <div className={classes.container}>
            <Card className={classes.root}>
            
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Pigeon Mail
          </Typography>
                </CardContent>
                <CardContent >
                    <div className={classes.textFields}>
                        <form noValidate autoComplete="off">
                            <TextField fullWidth id="email" label="Email" onChange={event => setEmail(event.target.value)} />
                            <TextField fullWidth id="password" label="Password" type="password" onChange={event => setPassword(event.target.value)} />
                            <TextField fullWidth id="passwordConfirm" label="Confirm Password" type="password" onChange={event => setPasswordConfirm(event.target.value)} />
                        </form>
                    </div>
                    <div style={{marginTop:"10px"}}>
                        <Button variant="contained" size="small" color="primary" onClick={handleSubmit}>
                        Sign Up
                        </Button>
                    </div>
                    
                </CardContent>
            </Card>
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        userId: getUserId(state)
    }
}

export default connect(mapStateToProps, {setUserId})(Login);