import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import App from './components/App/App';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './service/reducers';
// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose; 
// const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, applyMiddleware(thunk)); 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);