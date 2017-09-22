import {w3cwebsocket} from 'websocket';
 
export default class WsClient extends Component {
    
    constructor() {
        super()
        this.wsc = new W3CWebSocket('ws://localhost:8090/', 'echo-protocol');
    }
    
    onerror() {
        console.log('Connection Error');
    }

    onopen() {
        console.log('Digital Frame Client Connected');
         function sendNumber() {
            if (this.wsc.readyState === this.wsc.OPEN) {
                var number = Math.round(Math.random() * 0xFFFFFF);
                this.wsc.send(number.toString());
                setTimeout(sendNumber, 1000);
            }
        }
        sendNumber();
    }
    
    onclose() {
        console.log('Digital Frame Client Closed');
    }
    
    onmessage(e) {
        if (typeof e.data === 'string') {
            console.log("Received: '" + e.data + "'");
        }
    }
};