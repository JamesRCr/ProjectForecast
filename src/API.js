import React, { Component } from "react";
import {Typography} from "@material-ui/core";

class API extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            call: {},
            error: null
        };
    }

    componentDidMount(){
        const { address, city } = this.props;
        fetch(
        `https://cors-anywhere.herokuapp.com/https://seb7jc8jyf.execute-api.us-east-1.amazonaws.com/default/Hotspot-Warner?address=${address}&city=${city}`,
        {
            method: "GET",
            withCredentials: true,
            headers: new Headers({
                'x-api-key': "unOSTIR3x52fJJXETIJBg5aYwvzQd8hX2tOxhUZ1"
                }),
            }
        )
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data) || response.statusText;
                    return Promise.reject(error);
                }

                console.log(data);

                this.setState({call: data})
                this.setState({isLoading: false})


            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        console.log()
        const {isLoading, error} = this.state;
        const {address} = this.props;
        let busyness = this.state.call['busyness'];
        let status = this.state.call['status'];

        return(
            <React.Fragment>
                {error ? <Typography variant='p'>{error.message}</Typography> : null}
                {!isLoading ? (
                    <div key={address}>
                        <Typography variant='h4'>Busy?</Typography>
                        <Typography variant='h5'>{busyness}</Typography>
                        <Typography variant='h4'>Stay at home orders?</Typography>
                        <Typography variant='h5'>{status}</Typography>
                    </div>
                    ) : (
                        <Typography variant='h4'>Loading...</Typography>
                    )
                }
            </React.Fragment>
        );
    }
}

export default API;