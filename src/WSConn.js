import {w3cwebsocket} from 'websocket';
import cs from './constants';
import cfg from './config';

class WSConn {
    constructor() {
        this.conn = new w3cwebsocket('ws://'+cfg.IP+':'+cfg.PORT+'/', cfg.PROTOCOL);
        this.modules = {};
        
        this.handleMessage = function(context) {
            this.modules[context.moduleId] = context;
            this.conn.onmessage = response => { 
                response = JSON.parse(response.data);
                switch(response.cmd) {
                    case cs.CMD_SWITCH_MODULE:
                        console.log('switch module')
                        this.modules.main.context.setState({activeModuleID: response.moduleID});
                        break;
                    
                    case cs.CMD_NEW_PIC:
                        console.log('new photo')
                        let newPics = this.modules.photos.context.state.pics.slice();
                        newPics.splice(0, 1, response.photo);
                        this.modules.photos.context.setState({pics: newPics});
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