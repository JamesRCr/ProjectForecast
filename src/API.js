import React, { Component } from "react";
import {Typography} from "@material-ui/core";

class API extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            call: [],
            error: null
        };
    }

    componentDidMount(){
        fetch(
        `https://seb7jc8jyf.execute-api.us-east-1.amazonaws.com/default/Hotspot-Warner?address={this.props.address}&city={this.props.city}`,
        {
            method: "GET",
            withCredentials: true,
            headers: new Headers({
                'x-api-key': "unOSTIR3x52fJJXETIJBg5aYwvzQd8hX2tOxhUZ1"
                })
            }
        )
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                this.setState({ call: data, isLoading: false })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        const {isLoading, call, error} = this.state;
        const {address, city} = this.props;
        const {busyness, status} = call;
        return(
            <React.Fragment>
                <Typography variant='h3'>{address}, {city}</Typography>
                {error ? <Typography variant='p'>{error.message}</Typography> : null}
                {!isLoading ? (
                    <div key={address}>
                        <Typography variant='h2'>{busyness}</Typography>
                        <Typography variant='h2'>{status}</Typography>
                    </div>
                    ) : (
                        <Typography variant='h3'>Loading...</Typography>
                    )
                }
            </React.Fragment>
        );
    }
}

export default API;