import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
// "moduleResolution": "node"

// import { App } from './components/app'
import WrappedApp from './components/app'
import reducer from './reducer/index'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
  namespace JSX {
    interface IntrinsicElements {
      WithFirebaseAuth: any
    }
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk)),
)

ReactDOM.render(
  <Provider store={store}>
    <WrappedApp />
  </Provider>,
  document.getElementById('app'),
)
