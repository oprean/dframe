exports.OS = 'win';

exports.IP = 'localhost';
exports.PORT = 8093;
exports.PROTOCOL = 'protocol';

exports.GOOGLE_CLIENT_ID = '123'
exports.GOOGLE_CLIENT_SECRET = '123'
exports.GOOGLE_API_REFRESH_TOKEN = '123';
exports.GOOGLE_REDIRECT_URI = 'http://localhost:3000/';
// 94, 110, 128, 200, 220, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440, 1600
exports.GOOGLE_IMG_WIDHT = 1280;

exports.OPEN_WEATHER_MAP_API_KEY = '123';
exports.OPEN_WEATHER_MAP_API_URL = 'https://api.openweathermap.org/data/2.5/';
exports.OPEN_WEATHER_MAP_API_ENDPOINT = 'weather';
exports.OPEN_WEATHER_MAP_API_LOCATION_ID = 665087;
exports.OPEN_WEATHER_MAP_API_UNITS = 'metric';
exports.OPEN_WEATHER_MAP_API_LANG = 'ro';
exports.OPEN_WEATHER_MAP_API_REFRESH = 600000;

// 0 = photos, 1 = WEATHER, 2 = HOME 
exports.MODULES = [
    {id:0,name:'photos'},
    {id:1,name:'weather'},
    //{id:2,name:'home'},
]
exports.PHOTOS_MODULE_ID = 0;
exports.WEATHER_MODULE_ID = 1;
exports.HOME_MODULE_ID = 2;
exports.DEFAULT_MODULE_ID = 0
