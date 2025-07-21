import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Register from './pages/register/Register';
import Login from './pages/login/Login';

function App() {
  return (
    <Router>
    
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      
    </Router>
  )
}

export default App;
