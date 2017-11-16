import React, { Component } from 'react';
import HourForecast from './HourForecast';
import Paper from 'material-ui/Paper';
import Moment from 'react-moment';
import moment from 'moment';
import './Weather.css';

class DayForecast extends Component { 
    constructor(props) {
        super(props)
    }
    
    componentWillUpdate() {

    }
    
    render() {
        const style = {
          height: 480,
          float:'left',
          width: 300,
          margin: 20,
          textAlign: 'center',
          background:'#000000',
          color: '#ffffff'
        };

        const hours = this.props.day.hourlyForcast.map((hour,i) => ( <HourForecast key={i} hour={hour}/> ));
        return (
            <Paper style={style} zDepth={1}>
                {this.props.day.minTemp} - {this.props.day.maxTemp} °C &nbsp;
                <Moment className="forecast-time" locale="ro" format="dddd D">{this.props.day.dt}</Moment>
                {hours}
            </Paper>
        );
    }
}

export default DayForecast;