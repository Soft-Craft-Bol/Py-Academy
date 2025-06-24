import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

//Layouts
import { PublicLayout } from '../../shared/layouts/PublicLayout';
import { StudentLayout } from '../../shared/layouts/StudentLayout';
import { TeacherLayout } from '../../shared/layouts/TeacherLayout';


import CourseManangement from "../../shared/layouts/CourseManangement";
import LearningUnitsManager from "../../shared/layouts/LearningUnitsManager";

// import PrivateRoute from "@/features/auth/components/PrivateRoute";
// import { ExercisesPage } from "../../pages/student/ExercisesPage";

const Home = lazy(() => import('../../pages/home/Home'));
const ManageCourses = lazy(() => import('../../pages/ManageCourses/ManageCourses'));
const ExplorateCourses = lazy(() => import('../../pages/ExplorateCourses/ExplorateCourses'));
const PrivateCourseView = lazy(() => import('../../pages/ExplorateCourses/PrivateCourseView'));
const LoginPage = lazy(() => import('../../pages/auth/login/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/register/RegisterPage'));
const ResourceManager = lazy(() => import('../../pages/ManageResources/ManageResources'));

//Estudiante
const PyEditor = lazy(() => import('../../pages/student/PyEditorPage'));
const ChatIA = lazy(() => import('../../pages/student/ChatIA'));
const ExercisesPage = lazy(() => import('../../pages/student/ExercisesPage'));
const CoursesPage = lazy(() => import('../../pages/student/CoursesPage'));
const ExercisePage = lazy(() => import('../../pages/student/ExercisePage'));
const Certificates = lazy(() => import('@/pages/student/Certificates'));
const PublicCertificateViewer = lazy(() => import('@/pages/student/PublicCertificateViewer'));
const CourseStudent = lazy(() => import('@/pages/student/CourseStudent'));

//Docentes
const AssessmentsListPage = lazy(() => import( '@/pages/teacher/AssessmentsListPage'));
const AssessmentEditorPage = lazy(() => import( '@/pages/teacher/AssessmentEditorPage'));
const CreatePracticePage = lazy(() => import( '@/pages/teacher/CreatePracticePage'));

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explorar-cursos" element={<ExplorateCourses />} />
          <Route path="/Recursos-OER" element={<ResourceManager />} />
          <Route path="/ia-tutor" element={<Home />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/curso/:id" element={<PrivateCourseView />} />
          <Route path="/certificado/:id" element={<PublicCertificateViewer />} />
        </Route>

        {/* Docentes (falta hacer la ruta privada) */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<AssessmentsListPage />} />
          <Route path="newAssessments" element={<AssessmentEditorPage />} />
          <Route path="create-practice" element={<CreatePracticePage />} />
          <Route path="gestionar-cursos" element={<ManageCourses />} />
        </Route>

        
        {/* <Route path="/student" element={<PrivateRoute><StudentLayout /></PrivateRoute>}> */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="create-course" element={<CourseManangement />} />
          <Route path="learning-units" element={<LearningUnitsManager />} />
          <Route index element={<CoursesPage />} />
          <Route path="editor" element={<PyEditor />} />
          <Route path="chatIA" element={<ChatIA />} />
          <Route path="exercises" element={<ExercisesPage />} />
          <Route path="exercise" element={<ExercisePage />} />
          <Route path="certificates" element={<Certificates/>} />
          <Route path="curso/:id" element={<CourseStudent />} />
          <Route path="/student/curso/:id" element={<CourseStudent />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
