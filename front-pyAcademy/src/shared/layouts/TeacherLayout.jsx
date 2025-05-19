import { Outlet } from "react-router-dom";

export const TeacherLayout = () => {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
};
