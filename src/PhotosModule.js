import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import React, { Component } from 'react';
import Moment from 'react-moment';
import './Photos.css';
import cs from './constants';
import cfg from './config';

class Photo extends Component { 
    render() {
        return (
        <div key={this.props.photo.id}>
            <img alt={this.props.photo.album_title} src={this.props.photo.content.src}/>
            <div className="photo-album">{this.props.photo.album_title}</div>
            <Moment className="photo-time" unix locale="ro" fromNow>{this.props.photo.timestamp.toString().slice(0,-3)}</Moment>                
        </div>
        );
    }
}

class PhotosModule extends Component {
    constructor(props) {
        super(props)    
        
        this.state = {
            photo: { 
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
                summary: '' 
            },
        }

        this.photos = [
            this.state.photo,
        ]
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
        this.photos.splice(0, 1);
        this.photos.push(this.state.photo);
    }
    
    render() {     
        const photos = this.photos.map((photo) => (
            <Photo key={photo.id} photo ={photo} />        
        ));
        
        return (
        <div className="Photos-Container">
            <ReactCSSTransitionGroup
                transitionName="fader"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                {photos}
            </ReactCSSTransitionGroup>
        </div>
        );
    }
}

export default PhotosModule;
