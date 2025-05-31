import React from "react";
import Home from "./pages/home/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ManageCourses from "./pages/ManageCourses/ManageCourses";
import ExplorateCourses from "./pages/ExplorateCourses/ExplorateCourses";
import PrivateCourseView from "./pages/ExplorateCourses/PrivateCourseView";
//import Login from "./pages/login/Login";
import { StudentLayout } from "./shared/layouts/StudentLayout";
import { TeacherLayout } from "./shared/layouts/TeacherLayout";
import { PublicLayout } from "./shared/layouts/PublicLayout";
import CoursesPage from "./pages/student/CoursesPage";
import CodeEditorPage from "./pages/student/CodeEditorPage";
import { ChatIA } from "./pages/student/ChatIA";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explorar-cursos" element={<ExplorateCourses />} />
          <Route path="/Recursos-OER" element={<Home />} />
          <Route path="/ia-tutor" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/gestionar-cursos" element={<ManageCourses />} />
          <Route path="/curso/:id" element={<PrivateCourseView />} />
        </Route>

        <Route element={<TeacherLayout />}></Route>

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<CoursesPage />} />
          <Route path="editor" element={<CodeEditorPage />} />
          <Route path="chatIA" element={<ChatIA />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
