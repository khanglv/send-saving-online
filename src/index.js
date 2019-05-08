import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './progress.css';
import IdleTimerCom from './IdleTimer';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(<IdleTimerCom />, document.getElementById('root'));
serviceWorker.unregister();
