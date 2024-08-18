import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './component/chat.jsx'
import Login from './component/login.jsx'
import './index.css'
document.getElementById('root').setAttribute('class', 'h-screen')

createRoot(document.getElementById('root')).render(
  <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
)
