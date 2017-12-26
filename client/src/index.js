import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import './index.css'

import reducer from './reducer'
import App from './container/App'
import Admin from './component/Admin'
import registerServiceWorker from './registerServiceWorker'

const store = createStore( reducer,
  applyMiddleware(thunkMiddleware)
)

store.dispatch({ type: "CHANGE_APP", key: "internet", value: true })

// setTimeout(() => {
//   store.dispatch({ type: "CHANGE_CONVERSATION", key: "record_text", value: "what" })
// }, 7000)
//
// setTimeout(() => {
//   store.dispatch({ type: "CHANGE_CONVERSATION", key: "record_text", value: "ready" })
// }, 2910)
//
// setTimeout(() => {
//   store.dispatch({ type: "CHANGE_CONVERSATION", key: "record_text", value: "ready" })
// }, 2920)
//
// setTimeout(() => {
//   store.dispatch({ type: "CHANGE_CONVERSATION", key: "record_text", value: "ready" })
// }, 2920)


window.addEventListener('load', () => {
  window.addEventListener('online',  () => {
    store.dispatch({ type: "CHANGE_APP", key: "internet", value: true })
  })
  window.addEventListener('offline',  () => {
    store.dispatch({ type: "CHANGE_APP", key: "internet", value: false })
  })
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/admin" component={Admin}/>
      </div>
    </BrowserRouter>
  </Provider>,
document.getElementById('root'));

registerServiceWorker();
