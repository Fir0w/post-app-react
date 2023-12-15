import { Routes, Route } from 'react-router-dom'
import Signup from '../components/Signup';
import Index from '../components/Index';
import Login from '../components/Login';
import Home from '../components/Home';
import PageNotFound from '../components/PageNotFound';
import PostPage from '../components/PostPage';
import './App.css'

function App() {

    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="postpage" element={<PostPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default App;
