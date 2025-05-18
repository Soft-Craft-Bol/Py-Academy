import { Outlet } from "react-router-dom";

export const StudentLayout = () => {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
};
