import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider, reducer } from './state';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
