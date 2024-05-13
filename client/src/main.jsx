import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import './css/BGVideo.css';
import './css/LoginForm.css';
import './css/Btns.css';
import './css/Header.css';
import './css/Sidebar.css';
import 'react-toastify/dist/ReactToastify.css';
import './css/StickyTopHeader.css';
import './css/RegisterForm.css';
import './css/UnityWebGL.css';
import './css/GamePage.css';
import './css/LoadingOverlay.css';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './contexts/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
