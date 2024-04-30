import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import './css/BGVideo.css'
import './css/LoginForm.css'
import './css/LoginBtn.css'
import './css/Header.css'
import './css/Sidebar.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter></BrowserRouter>
    <App />
  </React.StrictMode>,
)
