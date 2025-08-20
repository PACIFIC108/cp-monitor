import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAuthorized, setIsAuthorized] = useState(true);
	const [loading, setLoading] = useState(true);
	const [userHandle, setUserHandle] = useState('');


	const checkAuth = async () => {
		try {
			const res = await axios.get("https://cp-monitor-server.onrender.com/api/auth/checkAuth", {
				withCredentials: true
			});
			setIsAuthenticated(res.status === 201);
		} catch (err) {
			setIsAuthenticated(false);
		} finally {
			setLoading(false);
		}
	};

	const checkUser = async () => {
		try {
			const response = await axios.get("https://cp-monitor-server.onrender.com/api/auth/me", {
				withCredentials: true
			});
            
			setIsAuthorized(response.status === 201);
			if (response?.data) setUserHandle(response.data.handle);

		} catch (err) {
			setIsAuthorized(false);
		} 
	};

	useEffect(() => {
		checkAuth();
		checkUser();
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAuthorized, setIsAuthorized, loading, userHandle }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
