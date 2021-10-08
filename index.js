import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

require('dotenv').config()

ReactDom.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );