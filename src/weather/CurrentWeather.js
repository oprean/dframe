import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Moment from 'react-moment';
import moment from 'moment';
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
          display: 'inline-block',
        };
        const tempStyle = {
            fontSize:'5em'
        }
        return (
        <Paper style={style} zDepth={1}>
            <div>{this.props.weather.name} </div>
            <i className={this.getIcon(this.props.weather)}></i>
            <div>{this.props.weather.weather[0].description} </div>
            <span style={tempStyle}>{parseInt(this.props.weather.main.temp)}</span>
            <span>°C</span>
        </Paper>
        );
    }
}

export default CurrentWeather;