import React, { Component } from 'react';
import WUtils from './WeatherUtils';
import Moment from 'react-moment';
import moment from 'moment';
import './Weather.css';

class HourForecast extends Component { 
    constructor(props) {
        super(props)
        console.log(this.props.hour)
    }
    
    componentWillUpdate() {

    }
    
    render() {
        return (
        <div> 
            {moment(this.props.hour.dt_txt).format('h')}
            <i className={WUtils.icon(this.props.hour)}></i>
            {parseInt(this.props.hour.main.temp,10)} °C
        </div>
        );
    }
}

export default HourForecast;