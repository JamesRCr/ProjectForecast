import React from 'react';
import { Box, Typography} from "@material-ui/core";
import {blueGrey} from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    title: {
        flexGrow: 1,
        backgroundColor: blueGrey[50],
        padding: theme.spacing(5),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(10),
    },
    fullWidth: {
        width: '100%',
    },
    box: {
        width: "50vw",
        maxWidth: "500px",
        minHeight: "10em",
        bgcolor: theme.palette.background.paper
    }
}));

function Forecast(props) {
    const classes = useStyles();
    const { name, forecast } = props;
    return (
        <main className={classes.fullWidth}>
            <div align={"center"}>
                <Box className={classes.box}>
                    <div className={classes.title}>
                        <Typography variant='h3'>{name}</Typography>
                    </div>
                    <div className={classes.content}>
                        {forecast}
                    </div>
                </Box>
            </div>
        </main>
    );
}

export default Forecast;