import React, { Component } from 'react';
import cs from '../constants';
import cfg from '../config';

class HomeModule extends Component {
    componentDidMount() {
        this.props.conn.handleMessage({moduleId:cfg.HOME_MODULE_ID, context:this});
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    sendCommand(command) {
        command = JSON.stringify(command)
        this.props.conn.sendMessage(command);
    }
  
    handleToggle() {
        this.sendCommand({
            text:cs.CMD_TOGGLE,
            params:null
        })
    }
    
    render() {
        return (
        <div className="Home-Container">           
            <h1>Home Automation</h1>
            <button onClick={this.handleToggle.bind(this)}> Toggle LED </button>
        </div>
        );
    }
}

export default HomeModule;
