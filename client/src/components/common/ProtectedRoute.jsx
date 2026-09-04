import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import Loader from './Loader.jsx';

/**
 * Wraps admin-only pages. Redirects to /admin/login if there's no
 * authenticated user once the initial auth check has finished.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader label="Checking session" />;

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute;
