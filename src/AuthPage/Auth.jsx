import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "sonner";



function Auth() {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(true)
	const [email,setEmail] = useState('')
	const [userName,setUserName] = useState('')
	const [password,setPassword] = useState('')
	const [Token,setToken] = useState('')


    const submitHandler=async (e)=>{
    	e.preventDefault()
           
    	const url=isLogin?'/auth/Login':'/auth/Signup'
    	const data=isLogin?{ userName,password }:{ email,userName,password }
    	// console.log(data);
        try{
           const response = await axios.post(`http://localhost:3000${url}`,data,{
           	withCredentials:true, 
           })
            // console.log(response)
           if(response.data.token){
           	localStorage.setItem("token",response.data.token)
           	setToken(response.data.token)
           		if(isLogin){
           			toast.success('Login Successfull')
	           		navigate("/app");
	           	}
                else{
                    setIsLogin(!isLogin)
	            	setEmail('')
	            	setUserName('')
	            	setPassword('')
           			toast.success('Signup Successfull')
                }
           }
       	   else{
           	toast.error('Wrong username or password')
           }

        }catch(err){
           console.error(err.response?.data || 'An Err Occured')
           toast.error(err.response?.data.message || "invalid inputs")
        }
	}

	return (
 
		<div className="flex items-center  justify-center min-h-screen bg-gradient-to-r from-purple-500 to-red-500 ">
           <div className="mr-16 flex flex-col items-center justify-center min-h-screen  text-white p-6 w-full md:w-auto">
			 
			  <img src="/images/CP_Monitor.png" alt="CP_MonitorLogo" 
			  className="w-32 h-32 mb-4 rounded-full shadow-lg" />
			  <h1 className="text-4xl font-extrabold text-center leading-tight">Welcome To CP_Monitor</h1>
			
			</div>

 
			<div className="mr-5 bg-white p-8 rounded-2xl shadow-xl  w-full md:w-auto text-center">
			 
			 <h2 className="text-3xl font-bold text-gray-800 mb-6">
			    {isLogin?"LogIn":"SignUp"}
			 </h2>

			 <form className="space-y-4" onSubmit={submitHandler}>
			    
			    {!isLogin && (
                  <input type="email" placeholder="Email" value={email}
					className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                   onChange={(e)=>setEmail(e.target.value)}
                  />

			   	)}
			  
			   <input type="text" placeholder="UserName" value={userName}
			       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    onChange={(e)=>setUserName(e.target.value)}
			   />
			   
			   <input type="password" placeholder="Password" value={password}
					className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                     onChange={(e)=>setPassword(e.target.value)}
			   />
			   
			   <button type="submit"
			       className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-all"
			      
			    >Submit
			    </button>
			 </form>

			  <p className="text-gray-600 mt-4 text-sm"> 
			   
			    {isLogin ? "Don't have an account?" : "Already have an account?"}
	              <button onClick={()=>{
	            	setIsLogin(!isLogin)
	            	setEmail('')
	            	setUserName('')
	            	setPassword('')
	               }}
	               className="text-purple-500 hover:underline ml-1"
	               >
	            
	              {isLogin?"Signup":"Login"}
	              </button>
	           
	           </p>
			</div>
		</div>
	)
}

export default Auth