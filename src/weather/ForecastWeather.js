import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import DayForecast from './DayForecast';
import './Weather.css';

class ForecastWeather extends Component { 
    constructor(props) {
        super(props)
        this.days = [];
    }
    
    componentWillUpdate() {
        this.processDays();
    }
      
    processDays() {
        let oDays = [];
        let sDay = moment(this.props.weather.list[0].dt_txt).format('YYYY-MM-DD');
        console.log(this.props.weather.list);
        let sDays = [];sDays.push(sDay);
        let oDay = {
            dt: sDay,
            hourlyForcast:[],
            icon:'',
            minTemp: 200,
            maxTemp: -200
        };
        
        for (let day of this.props.weather.list) {
            sDay = moment(day.dt_txt).format('YYYY-MM-DD');
            if (sDays.indexOf(sDay)<0) {
                sDays.push(sDay)
                oDays.push(JSON.parse(JSON.stringify(oDay)));
                oDay = {
                    dt: sDay,
                    hourlyForcast:[],
                    icon:'',
                    minTemp: 200,
                    maxTemp: -200
                };
                oDay.hourlyForcast.push(day)
            } else {
                oDay.hourlyForcast.push(day)
                oDay.minTemp = parseInt(day.main.temp<oDay.minTemp?day.main.temp:oDay.minTemp, 10);
                oDay.maxTemp = parseInt(day.main.temp>oDay.maxTemp?day.main.temp:oDay.maxTemp, 10);
            }
        }
        oDays.shift();
        oDays.pop(); 
        this.days = oDays;
        console.log(this.days);
    }
    
    getIcon(forecast) {
        
        var weather = forecast.weather[0];
        var dayNight = weather.icon.indexOf('n')>0?'-n':'-d';
        return 'owf owf-3x owf-'+weather.id+dayNight
    }

    render() {
        const forecasts = this.days.map((day,i) => ( <DayForecast key={i} day={day}/> ));
        return (
        <div>
            {forecasts}
        </div>
        );
    }
}

export default ForecastWeather;