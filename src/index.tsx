import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import App from './components/App/App';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider, useSelector } from 'react-redux';
import { rootReducer } from './service/reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import { socketMiddleware } from './service/midleware/socketMidleware';
import { wsActions } from './service/actions/constant';
import {wsUrl } from './utils/apiUrl';

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions) ));
const store = createStore(rootReducer, enhancer); 

export type rootStoreType = typeof store
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);