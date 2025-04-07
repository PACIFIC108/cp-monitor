import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'



const Footer = () => {

const navigate = useNavigate();

   const logoutHandler=async ()=>{
    try{
       const reponse=await axios.post(`https://cp-monitor-server.onrender.com/auth/logout`,{},{
            withCredentials:true, 
           })
       localStorage.removeItem("token")
       navigate('/')
     
   }catch(err){
     console.error('logout failed',err)
   }
}

  return (
    // <div>
      <footer className="footer bg-gray-800">
        <div className="footer-content py-1">
          <p className="footer-logo">PacificWebsite</p>
          <p className="copyright">© {new Date().getFullYear()} PacificWebsite. All rights reserved.</p>
        
          <div className="logout-icons">
                <button onClick={logoutHandler}
                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg transition-all"
                >LogOut
                </button>
          </div>
        </div>
      </footer>
    // </div>
  );
};

export default Footer;
