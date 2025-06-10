import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { StudentLayout } from "../../shared/layouts/StudentLayout";
import { TeacherLayout } from "../../shared/layouts/TeacherLayout";
import { PublicLayout } from "../../shared/layouts/PublicLayout";

const Home = lazy(() => import("../../pages/home/Home"));
const ManageCourses = lazy(() => import("../../pages/ManageCourses/ManageCourses"));
const ExplorateCourses = lazy(() => import("../../pages/ExplorateCourses/ExplorateCourses"));
const PrivateCourseView = lazy(() => import("../../pages/ExplorateCourses/PrivateCourseView"));
const LoginPage = lazy(() => import("../../pages/auth/LoginPage"));
const CoursesPage = lazy(() => import("../../pages/student/CoursesPage"));
const PyEditor = lazy(() => import("../../pages/student/PyEditorPage"));
const ChatIA = lazy(() => import("../../pages/student/ChatIA"));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
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

        <Route element={<TeacherLayout />}>
          {/* Rutas futuras para docentes */}
        </Route>

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<CoursesPage />} />
          <Route path="editor" element={<PyEditor />} />
          <Route path="chatIA" element={<ChatIA />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
