import React from "react";
import Home from "./pages/home/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ManageCourses from "./pages/ManageCourses/ManageCourses";
//import Login from "./pages/login/Login";
import { StudentLayout } from "./shared/layouts/StudentLayout";
import { TeacherLayout } from "./shared/layouts/TeacherLayout";
import { PublicLayout } from "./shared/layouts/PublicLayout";
import CoursesPage from "./pages/student/CoursesPage";
import CodeEditorPage from "./pages/student/CodeEditorPage";
import { ChatIA } from "./pages/student/ChatIA";
import LoginPage from "./pages/auth/LoginPage";
import PyEditor from "./pages/student/PyEditorPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explorar-cursos" element={<Home />} />
          <Route path="/Recursos-OER" element={<Home />} />
          <Route path="/ia-tutor" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/gestionar-cursos" element={<ManageCourses />} />
        </Route>

        <Route element={<TeacherLayout />}></Route>

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<CoursesPage />} />
          <Route path="editor" element={<CodeEditorPage />} />
          <Route path="PyEditor" element={<PyEditor />} />
          <Route path="chatIA" element={<ChatIA />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
