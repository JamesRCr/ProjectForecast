import React from 'react';
import {Button, Grid, Drawer, Typography, Box, TextField} from "@material-ui/core";
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
        if (e.key !== 'Enter') {
            setName(e.target.value);
        } else {
            let regex = /, (?<City>\S+)/;
            let [, City] = regex.exec(name) || [];
            addForecast(name, <API address={name} city={City}/>);
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
                <Grid container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justify="center"
                      >
                    <Grid item>
                        <Typography variant='h1'>
                            Forecast
                        </Typography>
                        <Typography variant='caption'>
                            Pre-Alpha Prototype
                        </Typography>
                    </Grid>
                    <Grid item>
                        <div>
                            <TextField
                                id="standard-full-width"
                                style={{ margin: 8 }}
                                placeholder="Address"
                                helperText="Address"
                                value={name}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onKeyDown={handleNameChange}
                                onChange={handleNameChange}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                let regex = /, (?<City>\S+)/;
                                let [, City] = regex.exec(name) || [];
                                addForecast(name, <API address={name} city={City}/>);
                                setName("");
                            }}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                <Box paddingTop={10} mx='auto'>
                        <Typography variant='h4'>
                            Forecast
                        </Typography>
                </Box>
                <Box paddingLeft={2} mx='auto'>
                        <Typography variant='body1'>
                            Enter and address and Forecast will help inform your decision whether to travel there or not. Please enter address in the format: 'name address, region'. For example, McDonalds 2781 Dufferin St, Toronto.
                        </Typography>
                </Box>
                <Box paddingTop={10} mx='auto'>
                    <Typography variant='h4'>
                        Busyness
                    </Typography>
                </Box>
                <Box paddingLeft={2} mx='auto'>
                    <Typography variant='body1'>
                        Sourced from Google data, we are able to estimate how busy a business currently is. Use this metric to determine if you can practice safe social distancing at your destination.
                    </Typography>
                </Box>
                <Box paddingTop={10} mx='auto'>
                    <Typography variant='h4'>
                        Lockdown Level
                    </Typography>
                </Box>
                <Box paddingLeft={2} mx='auto'>
                    <Typography variant='body1'>
                        Sourced from the Ontario Government, we are to inform you on the current lockdown level at the destination. Use this metric to determine the general severity of the pandemic in the region.
                    </Typography>
                </Box>
                <Box paddingTop={10} mx='auto'>
                    <Typography variant='h4'>
                        Further Information
                    </Typography>
                </Box>
                <Box paddingLeft={2} mx='auto'>
                    <Typography variant='body2'>
                        Please consult the Government of Canada's webpage for more information.
                    </Typography>
                </Box>
                <Box mx='auto'>
                    <Button
                        onClick={() => {
                            window.open('https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19.html', '_blank');
                        }}>
                        Information
                    </Button>
                </Box>
                <Box paddingTop={20} paddingLeft={2} mx='auto'>
                    <Typography variant='subtitle2'>
                        Built during the 2021 Hack the Case competition. Authors: Aeliya Asgar, Andrey Valkov, James Crowley, Jenny Wu
                    </Typography>
                </Box>
                <Box mx='auto'>
                    <Button
                        onClick={() => {
                            window.open('https://github.com/JamesRCr/ProjectForecast/tree/master', '_blank');
                        }}>
                        Github
                    </Button>
                </Box>
            </Drawer>
    );
}

export default ForecastForm;