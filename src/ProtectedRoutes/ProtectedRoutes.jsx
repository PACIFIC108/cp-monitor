import { useEffect, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../Context/AuthContext';

function ProtectedRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const notifiedRef = useRef(false);

  useEffect(() => {
    if (!loading && !isAuthenticated && !notifiedRef.current) {
      notifiedRef.current = true;
      toast.info('Kindly login first');
    }
  }, [isAuthenticated, loading]);

  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
