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
        <div className={classes.container}>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={logo}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Pigeon Mail
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        These are stout-bodied birds with short necks, and short slender bills that in some species feature fleshy ceres.
          </Typography>
                </CardContent>
                <CardContent >
                    <div className={classes.textFields}>
                        <form noValidate autoComplete="off">
                            <TextField fullWidth id="email" label="Email" onChange={event => setEmail(event.target.value)} />
                            <TextField fullWidth id="password" label="Password" type="password" onChange={event => setPassword(event.target.value)} />
                        </form>
                    </div>
                    <div style={{marginTop:"10px"}}>
                        <Button variant="contained" size="small" color="primary" onClick={handleSubmit}>
                        Login
                        </Button>
                    <Button size="small" color="primary" onClick={e => { history.push('/signup') }}>
                        Don't have an account? Sign up here
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