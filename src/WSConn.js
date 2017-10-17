import {w3cwebsocket} from 'websocket';
import cs from './constants';
import cfg from './config';

class WSConn {
    constructor() {
        this.conn = new w3cwebsocket('ws://'+cfg.IP+':'+cfg.PORT+'/', cfg.PROTOCOL);

        this.handleMessage = function(context) {
            this.conn.onmessage = response => { 
                response = JSON.parse(response.data);
                console.log(context.state);
                switch(response.cmd) {
                    case cs.CMD_SWITCH_MODULE:
                        context.setState({activeModuleID: response.moduleID});
                        break;
                    
                    case cs.CMD_NEW_PIC:
                        console.log('photo on message')
                        let newPics = context.state.pics.slice();
                        newPics.splice(0, 1, response.photo);
                        context.setState({pics: newPics});
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