import { Outlet } from "react-router-dom";
import { NavbarPublic } from "../ui/organisms/NavbarPublic";
import { Footer } from "../ui/organisms/Footer";

export const PublicLayout = () => {
  return (
    <>
      <NavbarPublic />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
