import Home from "./pages/home/Home";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./shared/ui/organisms/Navbar";
import { Footer } from "./shared/ui/organisms/Footer";
import ManageCourses from "./pages/ManageCourses/ManageCourses";
import Login from "./pages/login/Login";
import { StudentLayout } from "./shared/layouts/StudentLayout";
import { TeacherLayout } from "./shared/layouts/TeacherLayout";
import { PublicLayout } from "./shared/layouts/PublicLayout";
import CoursesPage from "./pages/student/CoursesPage";
import CodeEditorPage from "./pages/student/CodeEditorPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/gestionar-cursos" element={<ManageCourses />} />
        </Route>

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<CoursesPage />} />
          <Route path="editor" element={<CodeEditorPage />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
