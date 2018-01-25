import React, { Component } from 'react';
import './Webcam.css';
import cs from '../constants';
import cfg from '../config';

class WebcamModule extends Component {

    componentDidMount() {
        console.log('mount webcam');
    }

    componentWillUnmount() {

    }
       
    render() {
        const style = {
          width: cfg.WEBCAM_IMG_WIDTH,
          height: cfg.WEBCAM_IMG_HEIGHT,
        };
        return (
        <div className="Webcam-Container">           
            <h1>Webcam</h1>
            <img className="webcam-img" style={style} src={cfg.WEBCAM_IMG_URL}/>
        </div>
        );
    }
}

export default WebcamModule;
