fetch = require('node-fetch');
const Picasa = require('picasa')
const picasa = new Picasa()

var ACCESS_TOKEN = 'ya29.GlvNBPIjBMjqtZ7rCEnGJCnsvBRYE7zqx9A4jYf6b3VMrq05WrC_VQ1ErqBa9ScsCAiRP2m0jj6S01NSbBZ3o2TQdH6iYZxLb8XmY_zGv4kDdtLM6sp7lrRfFhDS';
const REFRESH_TOKEN = '1/FYKG9A4xCgotpSxCXN5pVF2JFr6u3BHGDTvWlDpXeWw';

// Digital Frame

/*const config1 = {
  clientId     : '837392028198-ho7a0ohmoqimtorbmkqkt465vncgaplg.apps.googleusercontent.com',
  redirectURI  : 'http://localhost:3000/'
}
const authURL = picasa.getAuthURL(config1)
console.log(authURL);*/


const config = {
  clientId     : '837392028198-ho7a0ohmoqimtorbmkqkt465vncgaplg.apps.googleusercontent.com',
  redirectURI  : 'http://localhost:3000/',
  clientSecret : '2APf0O25H5v201HvB6cPgPph'
}

/*picasa.getAccessToken(config, '4/v05x4mLH916LaaJsHUJ4o-14t_ZBm3uNtnkpgmSYgOA#', (error, accessToken, refreshToken) => {
  console.log(error, accessToken, refreshToken)
})*/

var fs = require('fs');

picasa.renewAccessToken(config, REFRESH_TOKEN, (error, accessToken) => {
  ACCESS_TOKEN =  accessToken;
  var options = {access:'private'};
    /*picasa.getAlbums(ACCESS_TOKEN, options,  (error, albums) => {
        //console.log(error, albums)
        albums.forEach(function(album){
            console.log(album.title);
            fs.appendFileSync('message.txt', album.title);
        })
    })*/
    options = {imgmax: 1600}
    
    picasa.getPhotos(ACCESS_TOKEN, options, (error, photos) => {
          console.log(error, photos)
    })
})