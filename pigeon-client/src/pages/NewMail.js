import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Icon from '@material-ui/core/Icon';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import SendIcon from '@material-ui/icons/Send';
import Bar from './Components';

import SimpleMap from './LocationSelect';
import { connect } from 'react-redux';
import { getStationId, getPigeonList, getUserId } from '../redux/selectors';
import Axios from 'axios';
import { APIv1Endpoint } from './endpoint';

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
    newMailPane: {
        paddingTop: "30px",
        paddingLeft: "30px",
        paddingBottom: "80px",
    },
    newMailPaneDescription: {
        marginTop: "10px",
        marginRight: "10px",
        float: "left",
    },
    newMailPaneItem: {
        marginTop: "18px",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    sendButtonBox: {
        float: "right",
        paddingTop: "10px",
        paddingRight: "20px",
        // paddingRight: "0px"
    }
}));

function NewMail(props) {
    const availablePigeons = props.pigeons
        .filter(pigeon => pigeon.messageId === null);

    const history = useHistory();
    const classes = useStyles();
    const [pigeonId, setPigeonId] = useState(availablePigeons[0].id);
    const [receiver, setReceiver] = useState('');
    // const [message, setMessage] = useState('');
    let message = '';

    const handleChange = (event) => {
        setPigeonId(event.target.value);
    };

    const handleSendButtonClick = () => {
        // TODO: validate stuffs
        Axios.post(APIv1Endpoint + '/messages/send', {
            userId: props.userId,
            receiver,
            pigeonId,
            content: message,
        })
            .then(res => {
                console.log('send message id', res.data.id);
                history.push('./dashboard');
            });
    };

    return (
        <div>
            <Bar />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Paper className={classes.newMailPane}>
                            <Grid container spacing={3}>

                                <Grid item xs={1}>
                                    <Typography variant="h6" component="h2" className={classes.newMailPaneDescription}>From: </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Local Station"
                                        defaultValue={props.stationId}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6" component="h2" className={classes.newMailPaneDescription}>To: &nbsp; &nbsp; </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        id="outlined-input"
                                        label="Destination Station"
                                        defaultValue=""
                                        variant="outlined"
                                        value={receiver}
                                        onChange={event => setReceiver(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6" component="h2" className={classes.newMailPaneDescription}>Pigeon </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Select a Pigeon</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={pigeonId}
                                            onChange={handleChange}
                                            label="Select a pigeon"
                                        >
                                            {availablePigeons.map(pigeon =>
                                                <MenuItem value={pigeon.id}>
                                                    {pigeon.name} - {pigeon.species}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <div className={classes.newMailPaneItem}>
                                <Typography variant="h6" component="h2" className={classes.newMailPaneDescription}>Message </Typography>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Message"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    defaultValue=""
                                    onChange={event => message = event.target.value}
                                    style={{ width: "500px" }}
                                />
                            </div>
                            <div className={classes.sendButtonBox}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    onClick={handleSendButtonClick}
                                    startIcon={<SendIcon />}>
                                    Send
                                </Button>
                            </div>

                        </Paper>
                    </Grid>


                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                        <SimpleMap />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    userId: getUserId(state),
    stationId: getStationId(state),
    pigeons: getPigeonList(state),
});

export default connect(mapStateToProps)(NewMail);
