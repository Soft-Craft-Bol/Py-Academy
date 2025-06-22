import { Outlet } from 'react-router-dom';

export function TeacherLayout() {
  return (
    <main className="min-h-screen">
      <Outlet />
      {/* coment */}
    </main>
  );
}
