import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PublicLayout } from '../../shared/layouts/PublicLayout';
import { StudentLayout } from '../../shared/layouts/StudentLayout';
import { TeacherLayout } from '../../shared/layouts/TeacherLayout';
import CourseManangement from '../../shared/layouts/CourseManangement';
import LearningUnitsManager from '../../shared/layouts/LearningUnitsManager';

import PrivateRoute from '@/app/providers/PrivateRoute';

// Pages públicas
const Home = lazy(() => import('../../pages/home/Home'));
const ManageCourses = lazy(() => import('../../pages/ManageCourses/ManageCourses'));
const ExplorateCoursesPublic = lazy(
  () => import('../../pages/ExplorateCourses/ExplorateCoursesPublic')
);
const CourseDashboard = lazy(() => import('../../pages/ExplorateCourses/CourseDashboard'));
const LoginPage = lazy(() => import('../../pages/auth/login/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/register/RegisterPage'));
const ResourceManager = lazy(() => import('../../pages/ManageResources/ManageResources'));
const ExplorateCoursesPublic = lazy(() => import('@/pages/ExplorateCourses/ExplorateCoursesPublic'));

// Estudiante
const PyEditor = lazy(() => import('../../pages/student/PyEditorPage'));
const ChatIA = lazy(() => import('../../pages/student/ChatIA'));
const ExercisesPage = lazy(() => import('../../pages/student/ExercisesPage'));
const CoursesPage = lazy(() => import('../../pages/student/CoursesPage'));
const ExercisePage = lazy(() => import('../../pages/student/ExercisePage'));
const Certificates = lazy(() => import('@/pages/student/Certificates'));
const PublicCertificateViewer = lazy(() => import('@/pages/student/PublicCertificateViewer'));
const CourseStudent = lazy(() => import('@/pages/student/CourseStudent'));
const ExplorateCourses = lazy(() => import('../../pages/ExplorateCourses/ExplorateCourses'));

// Maestro
const AssessmentsListPage = lazy(() => import('@/pages/teacher/AssessmentsListPage'));
const AssessmentEditorPage = lazy(() => import('@/pages/teacher/AssessmentEditorPage'));
const CreatePracticePage = lazy(() => import('@/pages/teacher/CreatePracticePage'));
const CourseDetailsPage = lazy(() => import('@/pages/teacher/CourseDetailsPage'));
const TeacherCoursesPage = lazy(() => import('@/pages/teacher/components/TeacherCoursesPage'));
const EditCoursePage = lazy(() => import('../../shared/layouts/EditCoursePage'));
//const CourseStudentsPage = lazy(() => import('../../pages/teacher/CourseDetailsPage'));
const UserProfilePage = lazy(() => import('../../pages/profile/UserProfilePage'));
//const MasCursos = lazy(() => import('../../pages/student/MasCursos'));

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explorar-cursos" element={<ExplorateCoursesPublic />} />
          <Route path="/ia-tutor" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/curso/:id" element={<CourseStudent />} />
          <Route path="/certificado/:id" element={<PublicCertificateViewer />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherCoursesPage />} />
            <Route path="assessmentsList" element={<AssessmentsListPage />} />
            <Route path="course/:id" element={<CourseDetailsPage />} />
            <Route path="course/:id/add-units" element={<LearningUnitsManager />} />
            <Route path="course/:id/unit/:unitId/create-practice" element={<CreatePracticePage />} />
            <Route path="newAssessments" element={<AssessmentEditorPage />} />
            <Route path="gestionar-cursos" element={<ManageCourses />} />
            <Route path="create-course" element={<CourseManangement />} />
            <Route path="gestionar-cursos/edit/:id" element={<EditCoursePage />} />
            <Route path="manage-resources" element={<ResourceManager />} />
            <Route path="profile/:userId" element={<UserProfilePage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<CoursesPage />} />
            <Route path="editor" element={<PyEditor />} />
            <Route path="chatIA" element={<ChatIA />} />
            <Route path="exercises" element={<ExercisesPage />} />
            <Route path="exercise" element={<ExercisePage />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="profile/:userId" element={<UserProfilePage />} />
            <Route path="CourseDashboard/:id" element={<CourseDashboard />} />
            <Route path="CourseDashboard/:id/resources" element={<CourseStudent />} />

            <Route path="explorar-cursos" element={<ExplorateCourses />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
