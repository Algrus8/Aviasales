import React from 'react'
import ReactDOM from 'react-dom/client'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { fetchSearchId } from './actions'
import './index.scss'
import App from './components/App'
import reducers from './reducers'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(fetchSearchId())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

const generateKeyFunc = () => {
  let ids = 0
  return () => {
    return ids++
  }
}

export const generateKey = generateKeyFunc()
