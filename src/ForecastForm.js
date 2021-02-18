import React from 'react';
import {Button, FormControl, Input, InputLabel, Grid, Drawer, Typography} from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 29,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundImage: `linear-gradient(#cfd9df,#e2ebf0)`,
        color: 'grey',
    },
    bigAvatar: {
        margin: 30,
        width: 100,
        height: 100,
    },
}));

function ForecastForm({ addForecast }) {
    const classes = useStyles();
    const [name, setName] = useState("");

    const handleNameChange = (e) => setName(e.target.value);

    return (
            <Drawer
                open={true}
                variant='permanent'
                anchor='left'
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <Grid container justify='center' alignItems='center'>
                    <Grid item>
                        <Typography variant='h1'>
                            Forecast
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel>Name</InputLabel>
                            <Input
                                value={name}
                                placeholder="Name"
                                onChange={handleNameChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <Button
                            onClick={() => {
                                addForecast(name, "forecast");
                                setName("");
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Drawer>
    );
}

export default ForecastForm;