import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import Bar from './Components';

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
        paddingBottom: "30px",
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
}));

export default function NewMail() {

    // constructor(props) {
    //     super(props);
    //     this.state = {email: '', password: ''};
    //     this.handleChangeEmail = this.handleChangeEmail.bind(this);
    //     this.handleChangePassword = this.handleChangePassword.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
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
                                            defaultValue="5PX7ZX"
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
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={age}
                                                onChange={handleChange}
                                                label="Age"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography variant="h6" component="h2" className={classes.newMailPaneDescription}>Pigeon </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={age}
                                                onChange={handleChange}
                                                label="Select a pigeon"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <div className={classes.newMailPaneItem}>
                                    <Typography variant="h6" component="h2" className={classes.newMailPaneDescription}>Message </Typography>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Multiline"
                                        multiline
                                        rows={4}
                                        defaultValue="Default Value"
                                        variant="outlined"
                                        style={{ width: "500px" }}
                                    />
                                </div>
                            </Paper>
                        </Grid>

                        
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<AddIcon />}
                                >
                                    New Pigeon Mail
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}