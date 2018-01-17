'use strict';
const cs = require('../constants.js');
const cfg = require('../config.js');
const fs = require('fs');

class ServerConfigs {
    constructor() {
        this.configData = fs.readFileSync('./src/modules-config.json', 'utf8');
    }       
    getConfigs(connection) {
        var response = {
            cmd:cs.CMD_GET_CONFIGS,
            data: this.configData
        };
        try {
            connection.sendUTF(JSON.stringify(response));
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = ServerConfigs