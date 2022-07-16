import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'antd/dist/antd.css';
import HomeManagement from './container/HomeManagement';
import './style.scss';

ReactDOM.render(
    <React.StrictMode>
        <HomeManagement/>
    </React.StrictMode>,
    document.getElementById('root')
);

