import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './ServiceWorker';
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";

// Define a global variable with a key value pair of the firebase App's API key
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};
// Initialize the firebase configuration
firebase.initializeApp(firebaseConfig);

// Render the App
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

