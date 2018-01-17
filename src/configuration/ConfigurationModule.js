import React, { Component } from 'react';
import cs from '../constants';
import cfg from '../config';

class ConfigurationModule extends Component {
    componentDidMount() {
        this.props.conn.handleMessage({moduleId:cfg.CONFIG_MODULE_ID, context:this});
    }

    componentWillUnmount() {

    }

    sendCommand(command) {
        command = JSON.stringify(command)
        this.props.conn.sendMessage(command);
    }
  
    render() {
        return (
        <div className="App">           
            <h1>Configuration</h1>
        </div>
        );
    }
}

export default ConfigurationModule;
