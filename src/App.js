import React, { Component } from 'react';
import WSConn from './WSConn';
import cs from './constants';

import ConfigurationModule from './configuration/ConfigurationModule';
import PhotosModule from './photos/PhotosModule';
import WeatherModule from './weather/WeatherModule';
import HomeModule from './home/HomeModule';
import WebcamModule from './webcam/WebcamModule';
import MainMenu from './MainMenu'
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
        this.conn.handleMessage({moduleId:cfg.MAIN_MODULE_ID, context:this});
        setTimeout(
            function(){
                this.conn.sendMessage(
                    JSON.stringify({
                        text:cs.CMD_GET_CONFIGS,
                        params:null
                    })
                )
            }.bind(this),
            1000
        );
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
            case cfg.WEBCAM_MODULE_ID:
                activeModule = <WebcamModule conn={this.conn} />;
                break;
            case cfg.CONFIG_MODULE_ID:
                activeModule = <ConfigurationModule conn={this.conn} />;
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
            <MainMenu conn={this.conn}/>
        </div>
        );
    }
}

export default App;
