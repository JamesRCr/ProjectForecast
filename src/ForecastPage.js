import { useState } from "react";
import Forecast from "./Forecast.js";
import ForecastForm from "./ForecastForm.js";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: "grid"
    },
}));

function ForecastPage() {
    const classes = useStyles();

    const [Forecasts, setForecasts] = useState([]);

    const addForecast = (name, forecast) => {
        setForecasts([{ name, forecast }, ...Forecasts]);
        console.log(Forecasts);
    };

    return (
        <div className={classes.root}>
            <ForecastForm addForecast={addForecast}/>

            {Forecasts.map(({ name, forecast }) => (
                <Forecast name={name} forecast={forecast} key={name} />
                    ))}
        </div>
    );
}

export default ForecastPage;