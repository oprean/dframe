import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import React, { Component } from 'react';
import {w3cwebsocket} from 'websocket';
import './App.css';
import './Animate.css';
import cs from './Constants';

class App extends Component {
    constructor() {
        super()     
        this.state = {
            pics: [0],
            msg:''
        }
    }

    getNewPhotoId() {
        return Math.floor((Math.random() * 10) + 1);
    }

    componentDidMount() {
        this.countdown = setInterval(this.timer.bind(this), 4000);
        this.connection = new w3cwebsocket('ws://'+cs.IP+':'+cs.PORT+'/', 'dframe-protocol');
        this.connection.onmessage = evt => { 
              this.setState({
              msg : evt.data
            })
          };
    }

    componentWillUnmount() {
        clearInterval(this.countdown);
    }

    timer() {
        let newPics = this.state.pics.slice();
        let photoId = this.getNewPhotoId();
        newPics.splice(0, 1, photoId);
        this.setState({pics: newPics});
        this.connection.send(photoId.toString())
    }
    
    handlePing() {
        this.connection.send(cs.CMD_PING);
    }
    
    handleNewPic() {
        this.connection.send(cs.CMD_NEW_PIC);
    }
    
    handleToggle() {
        this.connection.send(cs.CMD_TOGGLE);
    }
    
    render() {
        window.console.log(this.state.pics);
        const pics = this.state.pics.map((item, i) => (
                <img style={{width: '300px'}} key={item} alt={item} src={"/pics/photo"+item+".jpg"}/>
        ));
        
        return (
        <div className="App">
            <ReactCSSTransitionGroup
                transitionName="fader"
                transitionEnterTimeout={2000}
                transitionLeaveTimeout={2000}>
                {pics}
            </ReactCSSTransitionGroup>
            <div className="img-descr">Server msg: {this.state.msg}</div>
            <button onClick={this.handlePing.bind(this)}> Ping </button>
            <button onClick={this.handleToggle.bind(this)}> Toggle LED </button>
            <button onClick={this.handleNewPic.bind(this)}> New photo </button>
        </div>
        );
    }
}

export default App;
