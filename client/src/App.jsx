import { Routes, Route } from 'react-router-dom'
import Signup from '../components/Signup';
import Index from '../components/Index';
import Login from '../components/Login';
import Home from '../components/Home';
import './App.css'

function App() {

    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
        </Routes>
    );
}

export default App;
