import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { APIv1Endpoint } from "./endpoint";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import SimpleMap from './LocationSelect';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextField from '@material-ui/core/TextField';
import Bar from './Components';

import { getMessageList, getUserId, getLocation } from "../redux/selectors.js";
import { setMessageList, setLocation, setPigeonList, setStationId } from "../redux/actions.js";

import Axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
    },
    et: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    card: {
        // maxWidth: 10,
    },
    mailTab: {
        cursor: "pointer",
        boxShadow: '0 3px 5px 2px rgba(202, 202, 202, .3)',
        marginTop: "18px",
        // paddingTop: "100px",
        // color: 'white',
    },
}));

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;

    const containerStyles = {
      height: 6,
      width: '100%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: 0
    }

    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }

    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }

    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}></span>
        </div>
      </div>
    );
};

function DisplayMail(props) {
    const classes = useStyles();
    const mailArray = props.display;


    return (
        <>
            <Grid container spacing={3} >
                <Grid item xs={3}>
                    From
                    </Grid>
                <Grid item xs={5}>
                    Content
                    </Grid>
                <Grid item xs={3}>
                    Progress
                    </Grid>
            </Grid>
            {mailArray.map((mail, i) => (
                <Grid container
                    spacing={3}
                    key={i}
                    onClick={e => console.log("Clicked")}
                    className={classes.mailTab}>
                    <Grid item xs={3}>
                        {mail.sender}
                    </Grid>
                    <Grid item xs={5}>
                        {mail.content}
                    </Grid>
                    <Grid item xs={3}>
                        {console.log(mail)}
                        {/* work in progress */}
                        <ProgressBar completed={props.full ? 100 : Math.random() * 100} bgcolor="blue" />
                    </Grid>
                </Grid>
            ))}
        </>
    );
}

function Dashboard(props) {
    const classes = useStyles();
    let history = useHistory();
    let stationExist;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        Axios.post(APIv1Endpoint + "/user/getInfo", {
            userId: props.userId
        })
            .then(res => {
                if (!res.data.exists) handleClickOpen();
                else {
                    const { stationId, pigeons } = res.data;
                    props.setPigeonList(pigeons);
                    props.setStationId(stationId);
                }
            })
            .catch(err => {
                console.error(err.response);
            })
    };

    useEffect(() => {
        const req = {
            userId: props.userId
        }
        Axios.post(APIv1Endpoint + "/messages/list", req)
            .then(res => {
                props.setMessageList(res.data.messages);
            })
            .catch(err => {
                console.error(err.response);
            })
        Axios.post(APIv1Endpoint + "/user/getInfo", req)
            .then(res => {
                if (!res.data.exists) handleClickOpen();
                else {
                    const { stationId, pigeons } = res.data;
                    props.setPigeonList(pigeons);
                    props.setStationId(stationId);
                }
            })
            .catch(err => {
                console.error(err.response);
            })
        navigator.geolocation.getCurrentPosition(function (position) {
            props.setLocation({
                location: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            })
        });

    }, []);

    const mailArray = props.messageList;
    const [stationName, setStationName] = React.useState('');

    function createStation(name){
        const req = {
            userId: props.userId,
            stationId: name,
            location: {
                lat: props.location.location.latitude,
                lon: props.location.location.longitude
            }
        }
        console.log("req",req);
        // console.log("props",props);
        Axios.post(APIv1Endpoint + "/user/initialize", req)
            .then(res => {
                console.log("success");
                setTimeout(function() {
                    handleClose();
                }, 500);
            })
            .catch(err => {
                console.error(err.response);
            })
    }

    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Welcome!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        First time using Pigeon Mail in this location? Set up a station here!
                    </DialogContentText>
                    <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Station Name"
                            variant="outlined"
                            value={stationName}
                            onChange={event => setStationName(event.target.value)}
                        />
                    </div>
                    <SimpleMap />
                </DialogContent>
                <DialogActions>
                    <Button onClick={e => createStation(stationName)} color="primary" autoFocus>
                        Create Station
                    </Button>
                </DialogActions>
            </Dialog>
            <div>
                <Bar />
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<AddIcon />}
                                    onClick={e => { history.push('/newmail') }}
                                >
                                    New Pigeon Mail
                                </Button>
                            </Paper>
                            <div>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <h5>Filter</h5>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            Filter Options
                                    </div>
                                    </AccordionDetails>
                                </Accordion>

                            </div>
                        </Grid>
                        <Grid item xs>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" style={{ paddingBottom: "10px" }}>
                                        En Route
                                        </Typography>
                                    <DisplayMail display={mailArray} />
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary" size="medium">View on map</Button>
                                </CardActions>
                            </Card>
                            <div style={{ paddingTop: "10px" }}>

                            </div>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" style={{ paddingBottom: "10px" }}>
                                        Correspondence
                                        </Typography>
                                    <DisplayMail display={mailArray} full={true} />
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Manage</Button>
                                    {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                        Open simple dialog
                                    </Button> */}
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

// class DashboardClass extends React.Component {
//     render(){
//         return(<Dashboard />);
//     }
// }


const mapStateToProps = state => ({
    messageList: getMessageList(state),
    userId: getUserId(state),
    location: getLocation(state)
});

const mapActionsToProps = { setMessageList, setLocation, setStationId, setPigeonList };

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);