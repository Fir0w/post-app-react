import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from '../components/Signup';
import Index from '../components/Index';
import Login from '../components/Login';
import Home from '../components/Home';
import PageNotFound from '../components/PageNotFound';
import PostPage from '../components/PostPage';
// import PrivateRoutes from '../utils/PrivateRoutes';
import useAuthContext from '../components/useAuthContext';
import './App.css'


function App() {

    const { user } = useAuthContext();


    return (
        <Routes>
            <Route path="/" element={user ? <Navigate to="/home" replace /> : <Index />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" replace />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" replace />} />
            {/* <Route element={<PrivateRoutes />}> */}
            <Route path="/home" element={user ? <Home /> : <Navigate to="/" replace />} />
            <Route path="/postpage" element={user ? <PostPage /> : <Navigate to="/" replace />} />
            {/* </Route> */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}


export default App;
