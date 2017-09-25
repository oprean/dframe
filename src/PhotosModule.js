import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import React, { Component } from 'react';
import {w3cwebsocket} from 'websocket';
import './App.css';
//import './Animate.css';
import cs from './constants';
import cfg from './config';

class PhotosModule extends Component {
    constructor() {
        super()     
        this.state = {
            pics: [{ 
                id: null,
                album_id: null,
                album_title: null,
                access: null,
                width: null,
                height: null,
                size: null,
                checksum: null,
                timestamp: null,
                image_version: null,
                commenting_enabled: null,
                comment_count: 0,
                content:
                 { type: 'image/jpeg',
                   src: 'pics/photo0.jpg' },
                title: 'Digital Frame Logo',
                summary: '' }
            ],
            msg:''
        }
    }

    componentDidMount() {
        this.countdown = setInterval(this.timer.bind(this), 4000);
        
        this.connection = new w3cwebsocket('ws://'+cfg.IP+':'+cfg.PORT+'/', cfg.PROTOCOL);
        this.connection.onmessage = response => { 
            response = JSON.parse(response.data);
            switch(response.cmd) {
                case cs.CMD_NEW_PIC:
                    let newPics = this.state.pics.slice();
                    newPics.splice(0, 1, response.photo);
                    this.setState({pics: newPics});
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

    timer() {
        this.sendCommand({
            text:cs.CMD_NEW_PIC,
            params:null
        })
    }
    
    handlePing() {
        this.sendCommand({
            text:cs.CMD_PING,
            params:null
        })
    }
    
    handleNewPic() {
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
        const pics = this.state.pics.map((item, i) => (
            <div key={i}>
                <img key={item} alt={item} src={item.content.src}/>
                <div className="img-descr">{item.album_title}</div>
            </div>
        ));        
        return (
        <div className="App">
            <ReactCSSTransitionGroup
                transitionName="fader"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                {pics}
            </ReactCSSTransitionGroup>
            
            <button onClick={this.handlePing.bind(this)}> Ping </button>
            <button onClick={this.handleToggle.bind(this)}> Toggle LED </button>
            <button onClick={this.handleNewPic.bind(this)}> New photo </button>
        </div>
        );
    }
}

export default PhotosModule;
