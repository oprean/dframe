import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import React, { Component } from 'react';
import Moment from 'react-moment';
import './Photos.css';
import cs from './constants';
import cfg from './config';

class PhotosModule extends Component {
    constructor(props) {
        super(props)    
        
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
                timestamp: "",
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
        this.timer = setInterval(this.refreshModule.bind(this), 4000);
        this.props.conn.handleMessage({moduleId:cfg.PHOTOS_MODULE_ID, context:this});
        setTimeout(function(){this.refreshModule()}.bind(this),1000);
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
    
    render() {
        var pics = this.state.pics.map((item, i) => (
            <div key={i}>
                <img key={item} alt={item} src={item.content.src}/>
                <div className="photo-album">{item.album_title}</div>
                <Moment className="photo-time" unix locale="ro" fromNow>{item.timestamp.toString().slice(0,-3)}</Moment>                
            </div>
        ));        
        return (
        <div className="Photos-Container">
            <ReactCSSTransitionGroup
                transitionName="fader"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                {pics}
            </ReactCSSTransitionGroup>
        </div>
        );
    }
}

export default PhotosModule;
