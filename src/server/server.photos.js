const cs = require('../constants.js');
const cfg = require('../config.js');
const Picasa = require('picasa')
const picasa = new Picasa()

class ServerPhotos {
    constructor() {
        this.googleAccessToken = null;
        this.googleAlbums = [];
        const config = {
          clientId     : cfg.GOOGLE_CLIENT_ID,
          redirectURI  : cfg.GOOGLE_REDIRECT_URI,
          clientSecret : cfg.GOOGLE_CLIENT_SECRET
        }

        picasa.renewAccessToken(config, cfg.GOOGLE_API_REFRESH_TOKEN, (error, accessToken) => {
          this.googleAccessToken = accessToken;
          var options = {};
            picasa.getAlbums(accessToken, options,  (error, albums) => {
                this.googleAlbums = albums;
            });
        })
    }
    
    getNewPic(connection) {
        var album = Math.floor(Math.random() * this.googleAlbums.length);
        album = this.googleAlbums[album];
        //picasa.js:147 if (options.imgMax) accessTokenParams['imgmax'] = options.imgMax
        var options = {
            imgMax: cfg.GOOGLE_IMG_WIDHT,
            albumId : album.id
        }
        picasa.getPhotos(this.googleAccessToken, options, (error, photos) => {

            if (photos) {
                var photo = Math.floor(Math.random() * photos.length);
                photo = photos[photo];
                photo.album_title = album.title;
                var response = {
                    cmd:cs.CMD_NEW_PIC,
                    album: album, 
                    photo: photo
                };
                try {
                    connection.sendUTF(JSON.stringify(response));
                } catch(err) {
                    console.log(err);
                }
            }
        })
    }  
}

module.exports = ServerPhotos