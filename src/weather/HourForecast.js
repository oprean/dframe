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
        <div style={{verticalAlign: 'middle'}}> 
    <span style={{fontSize:'2em'}}>{moment(this.props.hour.dt_txt).format('H')}</span>&nbsp;
            <i style={{fontSize:'1.5em'}} className={WUtils.icon(this.props.hour)}></i>&nbsp;
            <span style={{fontSize:'2em'}}>{parseInt(this.props.hour.main.temp,10)} °C</span>
            <span>{this.props.hour.weather[0].description}</span>
        </div>
        );
    }
}

export default HourForecast;