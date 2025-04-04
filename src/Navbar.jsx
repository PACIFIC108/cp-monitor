import React from 'react'
import {Link} from "react-router-dom"
function Navbar() {
	return (
		<div>
			{/* Navbar */}
		   <nav className="bg-gray-800/90 p-2 shadow-xl w-full fixed top-0 left-0 flex justify-between items-center rounded-b-lg backdrop-blur-md">

		      {/* Logo */}
		     <div >

		      <a href='/app' className="flex items-center justify-center gap-2">
			      <img src="images/CP_Monitor.png" alt="CP_MonitorLogo" 
			    
				     className="w-16 h-16  rounded-full shadow-lg" />
			      <div className="text-4xl font-bold text-zinc-400">CP_Monitor</div>
               </a>

              </div>

		      {/* Navigation Links */}
		      <ul className="flex space-x-4">
		        <li>
		          <Link to="/app" className="text-white hover:text-gray-300">Home</Link>
		        </li>
		        <li>
		          <Link to="/app/services" className="text-white hover:text-gray-300">Services</Link>
		        </li>
		        <li>
		          <Link to="/app/contact" className="text-white hover:text-gray-300">Contact</Link>
		        </li>
		        <li>
		          <Link to="/app/about" className="text-white hover:text-gray-300">About</Link>
		        </li>
		      </ul>
		    </nav>
		</div>
	)
}

export default Navbar