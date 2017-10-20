import React, { Component } from 'react';
import WSConn from './WSConn';

import PhotosModule from './PhotosModule';
import WeatherModule from './WeatherModule';
import HomeModule from './WeatherModule';

import cfg from './config';
import './App.css';

class App extends Component {
    constructor() {
        super()     
        this.state = {
            activeModuleID: cfg.DEFAULT_MODULE_ID,
        }
        this.conn = new WSConn();
    }

    componentDidMount() {
        console.log('mount app')
        this.conn.handleMessage({moduleId:cfg.MAIN_MODULE_ID, context:this});
    }

    componentWillUnmount() {
    }

    sendCommand(command) {
        command = JSON.stringify(command)
        this.conn.sendMessage(command);
    }
        
    getActiveModule() {
        var activeModule = null;
        switch(this.state.activeModuleID) {
            case cfg.PHOTOS_MODULE_ID:
                activeModule = <PhotosModule conn={this.conn} />;
                break;
            case cfg.WEATHER_MODULE_ID:
                activeModule = <WeatherModule conn={this.conn} />;
                break;
            case cfg.HOME_MODULE_ID:
                activeModule = <HomeModule conn={this.conn} />;
                break;
            default:
                activeModule = <PhotosModule conn={this.conn} />;
                break;
        }
        return activeModule;
    }
        
    render() {
        return (
        <div className="App">
            {this.getActiveModule()}
        </div>
        );
    }
}

export default App;
