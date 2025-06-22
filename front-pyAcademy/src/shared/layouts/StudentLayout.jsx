//React
import { Outlet } from "react-router-dom";
import { useState } from "react";

// components
// Hola 
import { NavbarUser } from "../ui/organisms/NavbarUser";
import { Sidebar } from "../ui/organisms/Sidebar";
import { ChatbotWidget } from "../ui/organisms/chatbot/ChatbotWidget";

export const StudentLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const styleMain =
    "min-h-screen flex flex-col md:grid md:grid-cols-[65px_auto] md:[&.open]:grid-cols-[226px_auto]";

  return (
    <>
      <NavbarUser />
      <main className={`${styleMain} ${isSidebarOpen ? "open" : ""}`}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMenuOpen={isMenuOpen}
          toggleSidebar={toggleSidebar}
          toggleMenu={toggleMenu}
        />
        <div className="w-full md:col-start-2 p-8">
          <Outlet />
        </div>
      </main>
      <ChatbotWidget />
    </>
  );
};
