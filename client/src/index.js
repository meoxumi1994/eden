import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

import './index.css';
import App from './App';
import Admin from './Admin'
import Record from './Record'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/record" component={Record}/>
    </div>
  </BrowserRouter>,

document.getElementById('root'));

registerServiceWorker();
