import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../firebase/context';
import Loader from '../loader/Loader';

const AdminRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return <Loader />;
    }

    if (user && user.role === process.env.REACT_APP_ADMIN_TITLE && user.active === true) {
        return children;
    } else {
        return <Navigate to='/' replace state={{ path: location }} />;
    }
};

export default AdminRoute;