import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Bar from './Components';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


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
}));


export default function MessageView() {

    const classes = useStyles();

    return (
        <div>
            <Bar />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Paper className={classes.newMailPane}>
                            <Grid container spacing={3}>
                                <Grid item xs={1}>
                                    <Typography variant="h6" component="h2" className={classes.newMailPaneDescription}>Received from: </Typography>

                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6" component="h2" className={classes.newMailPaneDescription}>Pigeon Used:</Typography>

                                </Grid>
                            </Grid>
                            <div className={classes.newMailPaneItem}>
                                <Typography variant="h6" component="h2" className={classes.newMailPaneDescription}>Message </Typography>

                            </div>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

