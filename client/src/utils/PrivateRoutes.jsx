import { Outlet, Navigate } from 'react-router-dom';
import useAuthContext from '../../components/useAuthContext';

// FOR FUTURE USE!!! maybe

const PrivateRoutes = () => {
    const { user } = useAuthContext();
    console.log(user)

    return (
        user ? <Outlet /> : <Navigate to="/" replace />
    );
};


export default PrivateRoutes;