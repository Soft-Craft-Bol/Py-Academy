import Home from "./pages/home/Home";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./shared/ui/organisms/Navbar";
import { Footer } from "./shared/ui/organisms/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
