import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { LifeApp } from './LifeApp'
import './styles.css'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <LifeApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
