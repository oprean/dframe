import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Moment from 'react-moment';
import moment from 'moment';
import cs from './constants';
import cfg from './config';
import './Weather.css';

class Current extends Component { 
    
    getIcon(current) {
        return 'owf owf-3x owf-'+current.weather[0].id;
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

class Forecast extends Component { 
    constructor(props) {
        super(props)
        this.today = moment(this.props.weather.list[0].dt_txt, "YYYY-MM-DD HH:mm").format('D');
    }
    getToday() {
        return (
                <div>{moment(this.props.weather.list[0].dt_txt).format('D')}</div>
        )
    }
    
    getDays() {
        let oDays = [];
        let sDay = moment(this.props.weather.list[0].dt_txt).format('YYYY-MM-DD');
        let sDays = [];sDays.push(sDay);
        
        let oDay = {
            dt: sDay,
            hourlyForcast:[],
            minTemp: -200,
            maxTemp: 200
        };
        
        for (let day of this.props.weather.list) {
            sDay = moment(day.dt_txt).format('YYYY-MM-DD');
            if (sDays.indexOf(sDay)<0) {
                oDays.push(JSON.parse(JSON.stringify(oDay)));
                oDay = {
                    dt: sDay,
                    hourlyForcast:[],
                    minTemp: -200,
                    maxTemp: 200
                };
            } else {
                oDay.hourlyForcast.push(day)
                oDay.minTemp = day.temp<oDay.minTemp?day.temp:oDay.minTemp;
                oDay.maxTemp = day.temp<oDay.maxTemp?day.temp:oDay.maxTemp;
            }
        }
        
        return oDays;
    }
    
    getIcon(forecast) {
        return 'owf owf-3x owf-'+forecast.weather[0].id;
    }
    render() {
        var today = this.getToday();
        const forecasts = this.props.weather.list.map((forecast,i) => (
            <div key={i}>
                {forecast.main.temp} °C
                <i className={this.getIcon(forecast)}></i>
                <Moment className="forecast-time" locale="ro" format="dddd D, HH:mm">{forecast.dt_txt}</Moment>
            </div>
        ));

        return (
        <div>
            {forecasts}
        </div>
        );
    }
}

class WeatherModule extends Component {
    constructor() {
        super()     
        this.state = {
            weather:{ 
                coord: { lon: null, lat: null },
                weather: [ { id: null, main: null, description: null, icon: null } ],
                base: null,
                main:
                 { temp: null,
                   pressure: null,
                   humidity: null,
                   temp_min: null,
                   temp_max: null },
                visibility: null,
                wind: { speed: null, deg: null },
                clouds: { all: null },
                dt: null,
                sys:
                 { type: null,
                   id: null,
                   message: null,
                   country: null,
                   sunrise: null,
                   sunset: null },
                id: null,
                name: null,
                cod: null 
            },
            forecast:{
                city:{id:null},name:null,
                coord:{lon:null,lat:null},
                country:null,
                cod:null,
                message:null,
                cnt:null,
                list:[{
                    dt:null,
                    main:{
                        temp:null,
                        temp_min:null,
                        temp_max:null,
                        pressure:null,
                        sea_level:null,
                        grnd_level:null,
                        humidity:null,
                        temp_kf:null
                    },
                    weather:[{
                        id:804,
                        main:null,
                        description:null,
                        icon:null}],
                    clouds:{all:null},
                    wind:{speed:null,deg:null},
                    sys:{pod:null},
                    dt_txt:null}
                ]}
        }
    }

    componentDidMount() {
        this.timer = setInterval(this.refreshModule.bind(this), cfg.OPEN_WEATHER_MAP_API_REFRESH);
        this.props.conn.handleMessage({moduleId:cfg.WEATHER_MODULE_ID, context:this});
        setTimeout(function(){this.refreshModule()}.bind(this),1000);
    }
  
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    sendCommand(command) {
        command = JSON.stringify(command)
        console.log('sendCmd');
        this.props.conn.sendMessage(command);
    }

    refreshModule() {
        console.log('refresh');
        this.sendCommand({
            text:cs.CMD_UPDATE_WEATHER,
            params:null
        })
        this.sendCommand({
            text:cs.CMD_UPDATE_FORECAST,
            params:null
        })
    }
    
    render() {
        return (
        <div className="Weather-Container">
            <Current weather={this.state.weather}/>
            <Forecast weather={this.state.forecast}/>
        </div>
        );
    }
}

export default WeatherModule;