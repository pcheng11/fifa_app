import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import App from './App.jsx';
import reducers from './reducers';
import thunk from "redux-thunk";
import reducer from "./reducers";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./actions/types";
import { setCurrentUser } from "./actions/authActions"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
}

const initialState = {};
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        (window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()) ||
        compose
    )
);

const token = localStorage.getItem('jwtToken');
if (token) {
    const decoded = jwt_decode(token);
    // Set current user
    store.dispatch(setCurrentUser(decoded));
}

ReactDOM.render(
    
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...options}>
                <App/>
            </AlertProvider>
        </Provider>
    , 
    document.getElementById('root'));
