import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import React, { Component } from 'react';
import cs from '../constants';
import cfg from '../config';

class HomeModule extends Component {
    constructor(props) {
        super(props)    
    }

    componentDidMount() {
        this.timer = setInterval(this.refreshModule.bind(this), 4000);
        console.log('mount photo');
        this.props.conn.handleMessage({moduleId:cfg.PHOTOS_MODULE_ID, context:this});
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    sendCommand(command) {
        command = JSON.stringify(command)
        this.props.conn.sendMessage(command);
    }

    refreshModule() {
        this.sendCommand({
            text:cs.CMD_NEW_PIC,
            params:null
        })
    }
    
    handleToggle() {
        this.sendCommand({
            text:cs.CMD_TOGGLE,
            params:null
        })
    }
    
    render() {
        return (
        <div className="App">           
            <button onClick={this.handlePing.bind(this)}> Ping </button>
            <button onClick={this.handleToggle.bind(this)}> Toggle LED </button>
            <button onClick={this.handleNewPic.bind(this)}> New photo </button>
        </div>
        );
    }
}

export default HomeModule;
