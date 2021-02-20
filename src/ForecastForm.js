import React from 'react';
import {Button, FormControl, Input, InputLabel, Grid, Drawer, Typography} from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import API from './API.js';

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
    }
}));


function ForecastForm({ addForecast }) {
    const classes = useStyles();
    const [name, setName] = useState("");

    function handleNameChange(e) {
        if (e.key !== 13) {
            setName(e.target.value);
        } else {
            addForecast(name, <API address={name} city={"Toronto"}/>);
            setName("");
        }
    }

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
                                addForecast(name, <API address={name} city={"Toronto"}/>);
                                setName("");
                            }}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Drawer>
    );
}

export default ForecastForm;