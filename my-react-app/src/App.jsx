import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/Home/Home'

function App() {

  return (
    <Router>
    <div> 
      <Routes>

        <Route path="/" element={<HomePage />} />
    
      </Routes>
    </div>
  </Router>
  )
}

export default App
