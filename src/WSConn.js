import {w3cwebsocket} from 'websocket';
import cs from './constants';
import cfg from './config';

class WSConn {
    constructor() {
        this.conn = new w3cwebsocket('ws://'+cfg.IP+':'+cfg.PORT+'/', cfg.PROTOCOL);
        this.modules = {};
        
        this.handleMessage = function(context) {
            if (!context.moduleId) context.moduleId = 'main';
            this.modules[context.moduleId] = context;
            console.log(this.modules);
            this.conn.onmessage = response => {
                response = JSON.parse(response.data);
                switch(response.cmd) {
                    case cs.CMD_SWITCH_MODULE:
                        console.log('switch module')
                        this.modules.main.context.setState({activeModuleID: response.moduleID});
                        break;
                    
                    case cs.CMD_GET_CONFIGS:
                        console.log('get configs')
                        this.modules.main.context.setState({configs: JSON.parse(response.data)});
                        break;
                    
                    case cs.CMD_NEW_PIC:
                        console.log('new photo')
                        this.modules.photos.context.setState({photo:response.photo});
                        break;
                        
                    case cs.CMD_UPDATE_WEATHER:
                        this.modules.weather.context.setState({weather: response.weatherUpdate});
                        break;
                    default:
                        break
                }
            }
        }
        
        this.sendMessage = function(msg) {
            this.conn.send(msg);
        }
    }
}


export default WSConn;