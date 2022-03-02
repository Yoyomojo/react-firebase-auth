import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../firebase/context';
import Loader from '../loader/Loader';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return <Loader />;
    }

    if (!user || !user.active === true) {
        return <Navigate to={process.env.REACT_APP_LOGIN_ROUTE} replace state={{ path: location }} />;
    }

    return children;
};

export default PrivateRoute;