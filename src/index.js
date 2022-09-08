import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import './index.css'
import App from './App'
import { store } from 'store'
import { GeneralContextProvider } from 'context/GeneralContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GeneralContextProvider>
          <App />
        </GeneralContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
