import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import SignIn from './pages/SignIn/SignIn'

function App() {

  return (
    <Router>
    <div> 
      <Routes>

        <Route path="/" element={<SignIn />} />
    
      </Routes>
    </div>
  </Router>
  )
}

export default App
