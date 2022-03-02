import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../firebase/context';
import Loader from '../loader/Loader';

const PublicRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return <Loader />;
    }

    if (user) {
        return <Navigate to='/' replace state={{ path: location }} />;
    }

    return children;
};

export default PublicRoute;