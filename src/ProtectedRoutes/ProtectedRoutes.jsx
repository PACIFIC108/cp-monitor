import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'sonner';
import { useAuth } from '../Context/AuthContext';



function ProtectedRoutes() {

	const { isAuthenticated, loading } = useAuth();

	if (loading) return <div>Loading...</div>;
	if (!isAuthenticated) toast.info('Kindly Login First')
	return (
		<div>
			{isAuthenticated ? <Outlet /> : <Navigate to={'/'} />}
		</div>
	)
}

export default ProtectedRoutes