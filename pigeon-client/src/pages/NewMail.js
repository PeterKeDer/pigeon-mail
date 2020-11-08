import React from 'react';
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

import Typography from '@material-ui/core/Typography';

import SendIcon from '@material-ui/icons/Send';
import Bar from './Components';

import Map from "./Map/Map";
import Layers from "./Layers/Layers";
import TileLayer from "./Layers/TileLayer";
import VectorLayer from "./Layers/VectorLayer";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import osm from "./Source/osm";
import vector from "./Source/vector";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import Controls from "./Controls/Controls";
import FullScreenControl from "./Controls/FullScreenControl";

let styles = {
    'Point': new Style({
        image: new CircleStyle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
                color: 'magenta',
            }),
        }),
    }),
    'Polygon': new Style({
        stroke: new Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3,
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
        }),
    }),
    'MultiPolygon': new Style({
        stroke: new Stroke({
            color: 'blue',
            width: 1,
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
        }),
    }),
};

const geojsonObject = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "kind": "county",
                "name": "Wyandotte",
                "state": "KS"
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                -94.8627,
                                39.202
                            ],
                            [
                                -94.901,
                                39.202
                            ],
                            [
                                -94.9065,
                                38.9884
                            ],
                            [
                                -94.8682,
                                39.0596
                            ],
                            [
                                -94.6053,
                                39.0432
                            ],
                            [
                                -94.6053,
                                39.1144
                            ],
                            [
                                -94.5998,
                                39.1582
                            ],
                            [
                                -94.7422,
                                39.1691
                            ],
                            [
                                -94.7751,
                                39.202
                            ],
                            [
                                -94.8627,
                                39.202
                            ]
                        ]
                    ]
                ]
            }
        }
    ]
};
const geojsonObject2 = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "kind": "county",
                "name": "Johnson",
                "state": "KS"
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                -94.9065,
                                38.9884
                            ],
                            [
                                -95.0544,
                                38.9829
                            ],
                            [
                                -95.0544,
                                38.7365
                            ],
                            [
                                -94.9668,
                                38.7365
                            ],
                            [
                                -94.6108,
                                38.7365
                            ],
                            [
                                -94.6108,
                                38.846
                            ],
                            [
                                -94.6053,
                                39.0432
                            ],
                            [
                                -94.8682,
                                39.0596
                            ],
                            [
                                -94.9065,
                                38.9884
                            ]
                        ]
                    ]
                ]
            }
        }
    ]
};

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

export default function NewMail() {

    // constructor(props) {
    //     super(props);
    //     this.state = {email: '', password: ''};
    //     this.handleChangeEmail = this.handleChangeEmail.bind(this);
    //     this.handleChangePassword = this.handleChangePassword.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }

    const [center, setCenter] = React.useState([-94.9065, 38.9884]);
    const [zoom, setZoom] = React.useState(9);
    const [showLayer1, setShowLayer1] = React.useState(true);
    const [showLayer2, setShowLayer2] = React.useState(true);


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
                                <div className={classes.sendButtonBox}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        startIcon={<SendIcon />}>
                                        Send
                                </Button>
                                </div>

                            </Paper>
                        </Grid>


                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <div style={{ width: "100px" }}>
                                    <Map center={fromLonLat(center)} zoom={zoom}>
                                        <Layers>
                                            <TileLayer
                                                source={osm()}
                                                zIndex={0}
                                            />
                                            {showLayer1 && (
                                                <VectorLayer
                                                    source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
                                                    style={styles.MultiPolygon}
                                                />
                                            )}
                                            {showLayer2 && (
                                                <VectorLayer
                                                    source={vector({ features: new GeoJSON().readFeatures(geojsonObject2, { featureProjection: get('EPSG:3857') }) })}
                                                    style={styles.MultiPolygon}
                                                />
                                            )}
                                        </Layers>
                                        <Controls>
                                            <FullScreenControl />
                                        </Controls>
                                    </Map>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={showLayer1}
                                            onChange={event => setShowLayer1(event.target.checked)}
                                        /> Johnson County
			                            </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={showLayer2}
                                            onChange={event => setShowLayer2(event.target.checked)}
                                        /> Wyandotte County</div>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}