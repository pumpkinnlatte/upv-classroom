import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem('accessToken');

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            localStorage.removeItem('accessToken');
            return <Navigate to="/login" state={{ from: location }} replace />;
        }

        return children;
    } catch (error) {
        localStorage.removeItem('accessToken');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};