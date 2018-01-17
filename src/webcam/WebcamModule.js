import React, { Component } from 'react';
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
          width: 320,
          height: 240,
          margin: 20,
          textAlign: 'center',
          background:'#000000',
          color: '#ffffff'
        };
        return (
        <div className="Webcam-Container">           
            <h1>Webcam</h1>
            <img style={style} src="http://192.168.0.107:8081"/>
        </div>
        );
    }
}

export default WebcamModule;
