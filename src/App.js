import React, { Component } from 'react';
import {w3cwebsocket} from 'websocket';
import PhotosModule from './PhotosModule';
import WeatherModule from './WeatherModule';
import './App.css';
import cs from './constants';
import cfg from './config';

class App extends Component {
    constructor() {
        super()     
        this.state = {
            activeModuleID: cfg.DEFAULT_MODULE,
        }
    }

    componentDidMount() {
        this.countdown = setInterval(this.refreshModule.bind(this), 4000);
        
        this.connection = new w3cwebsocket('ws://'+cfg.IP+':'+cfg.PORT+'/', cfg.PROTOCOL);
        this.connection.onmessage = response => { 
            response = JSON.parse(response.data);
            switch(response.cmd) {
                case cs.CMD_SWITCH_MODULE:
                    this.setState({activeModuleID: response.moduleID});
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
        /*sendCommand({
            text:cs.CMD_NEW_PIC,
            params:null
        })*/
    }
        
    render() {
        var activeModule = <PhotosModule />;
        return (
        <div className="App">
            {activeModule}
        </div>
        );
    }
}

export default App;
