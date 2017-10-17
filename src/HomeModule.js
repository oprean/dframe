import React, { Component } from 'react';
import {w3cwebsocket} from 'websocket';
import cs from './constants';
import cfg from './config';

class HomeModule extends Component {
    constructor() {
        super()     
        this.state = {
            location: 'trs',
        }
    }

    componentDidMount() {
        this.countdown = setInterval(this.refreshModule.bind(this), 4000);

        var response = null;
        this.connection.onmessage = response => {           
        try {
            response = JSON.parse(response.data);
        } catch(err){
            console.log('Invalid server response! Response: '+ response.data);
        };
        
        if (response == null) return;
            
            switch(response.cmd) {
                case cs.CMD_UPDATE_WEATHER:
                    this.setState({weather: null});
                    break;
                default:
                    break
            }        
        }

    }

    componentWillUnmount() {
        clearInterval(this.countdown);
    }

    sendCommand(command) {
        command = JSON.stringify(command)
        this.connection.send(command);
    }

    refreshModule() {
    }
    
    render() {
        return (
        <div className="App">
            home module
        </div>
        );
    }
}

export default HomeModule;