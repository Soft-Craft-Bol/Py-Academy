import Home from "./pages/home/Home";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./shared/ui/organisms/Navbar";
import { Footer } from "./shared/ui/organisms/Footer";
import ManageCourses from "./pages/ManageCourses/ManageCourses";
import Login from "./pages/login/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gestionar-cursos" element={<ManageCourses />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
