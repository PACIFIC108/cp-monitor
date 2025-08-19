import React from 'react';


const Footer = () => {

<<<<<<< HEAD
=======
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

>>>>>>> 42dc2ce8d5b66d34a3c1e6a6bbee8d6d60804b46
  return (
    // <div>
      <footer className="footer bg-gray-900">
        <div className="footer-content py-1">
          <p className="footer-logo">PacificWebsite</p>
          <p className="copyright">© {new Date().getFullYear()} PacificWebsite. All rights reserved.</p>
        </div>
      </footer>
    // </div>
  );
};

export default Footer;
