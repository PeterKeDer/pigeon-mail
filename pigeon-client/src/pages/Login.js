import "./Login.css";
import "../helpers/auth.js"
import { signIn, signUp, authStateChanged, getCurrentUserId } from "../helpers/auth.js";
import React, { useState } from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getUserId} from "../redux/selectors.js";
import {setUserId} from "../redux/actions.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: 20,
      width: 200,
    },
  },
}));

function Login(props) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const handleSubmit = (event) => {
        console.log(email + ", " + password)
        signIn(email, password)
            .then(credentials => {
                if (credentials.user.uid !== null) {
                    props.setUserId(credentials.user.uid); 
                    console.log("uid: ", credentials.user.uid);
                    history.push("./dashboard");
                } else {
                    console.log("invalid user");
                }
            });  
        
        event.preventDefault();
    };

    return (
        <Box color="primary.main" bgcolor="background.paper" justifyContent="center">
            <div className={classes.root}>
                <form noValidate autoComplete="off">
                    <TextField id="email" label="Email" onChange={event => setEmail(event.target.value)}/>
                    <TextField id="password" label="Password" onChange={event => setPassword(event.target.value)}/>
                </form>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Log In
                </Button>
                <br />
                <Link to="/signup">Don't have an account? Sign up here</Link>
            </div>
        </Box>
        
    );
}

const mapStateToProps = (state) => {
    return {
        userId: getUserId(state)
    }
}

export default connect(mapStateToProps, {setUserId})(Login);
    