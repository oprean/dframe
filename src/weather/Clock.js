import React, { Component } from 'react';
import moment from 'moment';
import './Clock.css';

class Clock extends Component { 

    constructor() {
        super()     
        this.state = {
            time: moment().format('HH:mm'),
            hour: moment().format('HH'),
            min: moment().format('mm'),
            sec: moment().format('ss')
        }
    }
    
    componentDidMount() {
        this.timer = setInterval(this.refreshModule.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    refreshModule() {
        this.setState({
            time: moment().format('HH:mm'),
            hour: moment().format('HH'),
            min: moment().format('mm'),
            sec: moment().format('ss')
        })
    }
    
    render() {
        return (
        <div className="clock-container">
            <div className="clock-content">
                {this.state.hour}
                <span className="blink">:</span>
                {this.state.min}
                <span className="clock-sec">
                    :{this.state.sec}
                </span>

            </div>
        </div>


        );
    }
}

export default Clock;