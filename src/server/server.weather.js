const cs = require('../constants.js');
const cfg = require('../config.js');
fetch = require('node-fetch');

class ServerWeather {
    constructor() {       
    }
    
    getParams() {
        var params = "?";
        params += "id=" + cfg.OPEN_WEATHER_MAP_API_LOCATION_ID;
        params += "&units=" + cfg.OPEN_WEATHER_MAP_API_UNITS;
        params += "&lang=" + cfg.OPEN_WEATHER_MAP_API_LANG;
        params += "&APPID=" + cfg.OPEN_WEATHER_MAP_API_KEY;

        return params;
    }

    getWeatherUpdate(connection) {
        var url = cfg.OPEN_WEATHER_MAP_API_URL + cfg.OPEN_WEATHER_MAP_API_WEATHER_ENDPOINT + this.getParams();
        fetch(url)
        .then(res => res.json())
	.then(json => {
            console.log(json);
            var response = {
                cmd:cs.CMD_UPDATE_WEATHER,
                weatherUpdate: json
            };
            try {
                connection.sendUTF(JSON.stringify(response));
            } catch(err) {
                console.log(err);
            }
        });
    }
    
    getForecastUpdate(connection) {
        var url = cfg.OPEN_WEATHER_MAP_API_URL + cfg.OPEN_WEATHER_MAP_API_FORECAST_ENDPOINT + this.getParams();
        fetch(url)
        .then(res => res.json())
	.then(json => {
            console.log(json);
            var response = {
                cmd:cs.CMD_UPDATE_FORECAST,
                forecastUpdate: json
            };
            try {
                connection.sendUTF(JSON.stringify(response));
            } catch(err) {
                console.log(err);
            }
        });
    }
}

module.exports = ServerWeather