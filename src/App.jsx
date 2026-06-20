import { Route, Routes } from 'react-router-dom';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import Home from './pages/Home';
import Contact from './pages/Contact';
import MonitoringControls from './pages/MonitoringControls';
import About from './pages/About';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100">
      <Navbar />
      <main className="min-h-[calc(100vh-8rem)] pt-20">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/monitoring-control" element={<MonitoringControls />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
