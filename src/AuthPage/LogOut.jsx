import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {LogOut} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';


function Logout() {
	const navigate = useNavigate();
    const {setIsAuthenticated}=useAuth();

       const logoutHandler=async ()=>{
        try{
          await axios.post(`https://cp-monitor-server.onrender.com/api/auth/logout`,{},{
                withCredentials:true, 
          })
           setIsAuthenticated(false);
           navigate('/')
         
       }catch(err){
         console.error('logout failed',err)
       }
    }
	return (
		<div>
			 <button 
		          onClick={logoutHandler}
		          title="Logout"
		          className="bg-gray-300 p-2 rounded-full hover:bg-red-600 transition duration-300"
		        >
		          <LogOut size={22} />
		       </button>
		</div>
	)
}

export default Logout
