import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from '../components/Signup';
import LandingPage from '../components/LandingPage';
import Login from '../components/Login';
import Home from '../components/Home';
import PageNotFound from '../components/PageNotFound';
import PostPage from '../components/PostPage';
import Profile from '../components/Profile';
import useAuthContext from '../components/useAuthContext';
import Avatar from '../components/Avatar';
import './App.css';


function App() {

    const { user } = useAuthContext();


    return (
        <Routes>
            <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/home" replace />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" replace />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" replace />} />
            <Route path="/home" element={user ? <Home /> : <Navigate to="/" replace />} />
            <Route path="/post/:postId" element={user ? <PostPage /> : <Navigate to="/" replace />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/profile/:username/avatar" element={user ? <Avatar /> : <Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}


export default App;
