import './awsConfig';  
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'; // your global CSS
import App from './App'; // main App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
