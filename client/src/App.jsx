import { Routes, Route } from 'react-router-dom'
import Signup from '../components/Signup';
import Home from '../components/Home';
import './App.css'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="sign-up" element={<Signup />} />
      </Routes>
  );
}

export default App;
