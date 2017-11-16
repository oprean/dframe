import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import WUtils from './WeatherUtils';
import './Weather.css';

class CurrentWeather extends Component { 
    
    getIcon(current) {
        var weather = current.weather[0];
        var dayNight = weather.icon.indexOf('n')>0?'-n':'-d';
        return 'owf owf-3x owf-'+weather.id+dayNight
    }
    
    render() {
        const style = {
          height: 200,
          width: 200,
          margin: 20,
          textAlign: 'center',
          background:'#000000',
          color: '#ffffff'
        };
        const tempStyle = {
            fontSize:'5em'
        }
        return (
        <Paper style={style} zDepth={1}>
            <div>{this.props.weather.name} </div>
            <i className={WUtils.icon(this.props.weather)}></i>
            <div>{this.props.weather.weather[0].description} </div>
            <span style={tempStyle}>{parseInt(this.props.weather.main.temp,10)}</span>
            <span>°C</span>
        </Paper>
        );
    }
}

export default CurrentWeather;