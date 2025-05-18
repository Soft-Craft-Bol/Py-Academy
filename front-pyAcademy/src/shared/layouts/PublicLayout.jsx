import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/organisms/Navbar";
import { Footer } from "../ui/organisms/Footer";

export const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
