import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/app/context/AuthContext';

function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
