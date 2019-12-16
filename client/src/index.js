import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware, compose } from 'redux'
import { App } from './App';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import reducer from './reducers/index'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()
const app = document.getElementById('root')

const store = createStore(reducer,
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    ));
sagaMiddleware.run(rootSaga)



ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    ,
    app);
