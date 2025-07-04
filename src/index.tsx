
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import './index.css';
import App from './pages/App';
// import reportWebVitals from './reportWebVitals';

const container=document.getElementById('root')
if(!container){
    throw new Error('no root element')
}

const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
     <App />
     </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
