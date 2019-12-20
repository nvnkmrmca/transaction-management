
import React from 'react';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import AppContainer from './components/app-container';
// import FCM from './services/fcm';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './css/bootstrap.min.css';
import './css/common.scss';
import * as history  from 'history';

export default class App extends React.Component {
    render() {
        return(<>
            <AppContainer history={history.createBrowserHistory()} />
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
          </>      
        )
    }
};