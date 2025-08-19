import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Auth from './AuthPage/Auth'
import { BrowserRouter , Route, Routes } from "react-router-dom";
import './App.css'
import { Toaster } from "sonner";
import { AuthProvider } from './Context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
         <Toaster position="top-right" richColors  expand={true}/>
          <Routes>
              <Route path="/app/*" element={<App />} />
              <Route path="/" element={<Auth />} />
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
