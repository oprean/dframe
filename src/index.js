import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import 'moment/locale/ro';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MuiThemeProvider><App /></MuiThemeProvider>, 
    document.getElementById('root')
);
registerServiceWorker();
