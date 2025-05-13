import Home from "./pages/home/Home";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./shared/ui/organisms/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
