class WeatherUtils {
    icon(current) {
        var weather = current.weather[0];
        var dayNight = weather.icon.indexOf('n')>0?'-n':'-d';
        return 'owf owf-3x owf-'+weather.id+dayNight
    }
}

export default new WeatherUtils;