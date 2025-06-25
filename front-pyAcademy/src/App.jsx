// src/App.jsx

import { Toaster } from "sonner";
import './App.css';
import { AppRoutes } from './app/routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors position="top-right" />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
