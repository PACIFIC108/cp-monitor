import { Routes, Route } from "react-router-dom"


import Footer from "./Footer.jsx"
import Navbar from './Navbar.jsx'
import Home from './pages/Home'
import Contact from './pages/Contact'
import MonitoringControls from './pages/MonitoringControls'
import About from './pages/About'
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes.jsx"


function App() {
<<<<<<< HEAD
=======
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
>>>>>>> 42dc2ce8d5b66d34a3c1e6a6bbee8d6d60804b46

  return (
    <div className="flex flex-col min-h-screen">
      <div className='mb-16'><Navbar /></div>
      <main className="flex-grow">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/monitoring-control" element={<MonitoringControls />} />
          </Route>
        </Routes>
      </main>
      <div className="mt-10"><Footer /></div>
    </div>
  )
}

export default App
