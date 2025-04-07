import { useState,useEffect } from 'react'
import { toast } from "sonner";
import Footer from "./Footer.jsx"
import Navbar from './Navbar.jsx'
import {Routes,Route,useNavigate} from "react-router-dom"
import Home from './pages/Home'
import Contact from './pages/Contact'
import Services from './pages/Services'
import About from './pages/About'
import axios from 'axios'

function App() {
  const navigate = useNavigate();

    useEffect(() => {

      axios.get("https://cp-monitor-server.onrender.com/auth/checkAuth", { withCredentials: true })
      .then((res) => {
        if (res.status !== 200) {
          toast.info("Kindly Login First");
          navigate("/");
        }
      })
      .catch(() => {
        toast.info("Kindly Login First");
        navigate("/");
      });

    }, []);

  return (
    <div className="flex flex-col min-h-screen">
       <div className='mb-16'><Navbar /></div>
        <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
         </main>
        <div className="mt-10"><Footer /></div>
    </div>
  )
}

export default App
