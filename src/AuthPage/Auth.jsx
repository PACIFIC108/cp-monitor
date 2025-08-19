import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "sonner";
import { useAuth } from '../Context/AuthContext';



function Auth() {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false); 
    const {isAuthenticated,setIsAuthenticated}=useAuth();

    useEffect(() => {
	  if (isAuthenticated) navigate("/app");
	}, [isAuthenticated]);
	
	const submitHandler = async (e) => {
		e.preventDefault();
		if (isLoading) return; 

		const url = isLogin ? '/api/auth/Login' : '/api/auth/Signup';
		const data = isLogin ? { userName, password } : { email, userName, password };

		try {
			setIsLoading(true); 
			const response = await axios.post(`https://cp-monitor-server.onrender.com${url}`, data, {
				withCredentials: true,
			});
      
			if (response.status === 201) {
				if (isLogin) {
					toast.success('Login Successful');
                    setIsAuthenticated(true);
					navigate("/app");
				} else {
					setIsLogin(true);
					setEmail('');
					setUserName('');
					setPassword('');
					toast.success('Signup Successful');
				}
			} else {
				toast.error('Wrong username or password');
			}
		} catch (err) {
			console.error(err.response?.data || 'An Err Occurred');
			toast.error(err.response?.data.message || "Invalid inputs");
		} finally {
			setIsLoading(false); 
		}
	};

	return (
		<div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-red-500 overflow-x-hidden px-4">
 
		  <div className="flex flex-col items-center justify-center text-white p-6 w-full md:w-auto md:mr-12 mb-8 md:mb-0">
		    <img
		      src="/images/CP_Monitor.png"
		      alt="CP_MonitorLogo"
		      className="w-24 h-24 md:w-32 md:h-32 mb-4 rounded-full shadow-lg"
		    />
		    <h1 className="text-3xl md:text-4xl font-extrabold text-center leading-tight">
		      Welcome To CP_Monitor
		    </h1>
		  </div>


		  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
		    <h2 className="text-3xl font-bold text-gray-800 mb-6">
		      {isLogin ? "LogIn" : "SignUp"}
		    </h2>
		
		    <form className="space-y-4" onSubmit={submitHandler}>
		      {!isLogin && (
		        <input
		          type="email"
		          placeholder="Email"
		          value={email}
		          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
		          onChange={(e) => setEmail(e.target.value)}
		        />
		      )}
		
		      <input
		        type="text"
		        placeholder="UserName"
		        value={userName}
		        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
		        onChange={(e) => setUserName(e.target.value)}
		      />
		
		      <input
		        type="password"
		        placeholder="Password"
		        value={password}
		        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
		        onChange={(e) => setPassword(e.target.value)}
		      />
		
		      <button
		        type="submit"
		        disabled={isLoading}
		        className={`w-full ${
		          isLoading
		            ? "bg-purple-300 cursor-not-allowed"
		            : "bg-purple-500 hover:bg-purple-600"
		        } text-white py-2 rounded-lg transition-all`}
		      >
		        {isLoading ? "Processing..." : "Submit"}
		      </button>
		    </form>
		
		    <p className="text-gray-600 mt-4 text-sm">
		      {isLogin ? "Don't have an account?" : "Already have an account?"}
		      <button
		        onClick={() => {
		          setIsLogin(!isLogin);
		          setEmail("");
		          setUserName("");
		          setPassword("");
		        }}
		        className="text-purple-500 hover:underline ml-1"
		      >
		        {isLogin ? "Signup" : "Login"}
		      </button>
		    </p>
		  </div>
	</div>

	);
}

export default Auth;
