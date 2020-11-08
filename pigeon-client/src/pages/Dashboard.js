import React from 'react';
import { useState, useEffect } from 'react';
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

import PropTypes from 'prop-types';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import SimpleMap from './LocationSelect';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Bar from './Components';

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

function DisplayMail(props) {
    const classes = useStyles();
    const mailArray = props.display;
    const req = {
        userId: "4p0bD8XA1ONCe1OJWXmvFzmxg7u1",
    }
    useEffect(() => {
        Axios.post(APIv1Endpoint + "/user/getInfo", req)
            .then(res => {
                console.log("status:", res);
            })
            .catch(err => {
                console.error(err.response);
            })
    });
    useEffect(() => {
        Axios.post(APIv1Endpoint + "/messages/list", req)
            .then(res => {
                console.log("read:", res);
                // toast.success(`campaignInfo was added.`);
                // setTimeout(function () {
                //     info.object.props.history.push('/campaign/campaign');
                // }, 1000);
            })
            .catch(err => {
                console.error(err.response);
            })
    });






    return (
        <>
            <Grid container spacing={3} >
                <Grid item xs={3}>
                    From
                    </Grid>
                <Grid item xs={6}>
                    Content
                    </Grid>
                <Grid item xs={3}>
                    Recieved Time
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
                    <Grid item xs={6}>
                        {mail.content}
                    </Grid>
                    <Grid item xs={3}>
                        {mail.time}
                    </Grid>
                </Grid>
            ))}
        </>
    );
}

function Dashboard(props) {
    const classes = useStyles();
    let history = useHistory();

    // FOR TESTING PURPOSES
    const mail1 = {
        content: "patrick dont know how to use github",
        sender: "Kevin",
        reciever: "Peter",
        time: "November 18, 2020 at 12:00:00 AM"
    };
    const mail2 = {
        content: "patrick is toxic",
        sender: "Kevin",
        reciever: "Patrick",
        time: "November 18, 2020 at 12:00:00 AM"
    };
    const mailArray = [mail1, mail2];
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log("props", props);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Welcome!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        First time using Pigeon Mail in this location? Set up a station here!
          </DialogContentText>
          
          <SimpleMap />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
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
                                    <DisplayMail display={mailArray} />
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Manage</Button>
                                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                        Open simple dialog
                                    </Button>
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


const mapStateToProps = state => ({ state });

const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);