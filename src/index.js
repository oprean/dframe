import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';
import 'moment/locale/ro';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

Moment.startPooledTimer();

ReactDOM.render(
    <MuiThemeProvider><App /></MuiThemeProvider>, 
    document.getElementById('root')
);
registerServiceWorker();
