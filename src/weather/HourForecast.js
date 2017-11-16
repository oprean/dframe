import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import './Weather.css';

class HourForecast extends Component { 
    constructor(props) {
        super(props)
    }
    
    componentWillUpdate() {

    }
    
    render() {
        return (
        <div> 
            {this.props.hour.dt_txt}
        </div>
        );
    }
}

export default HourForecast;