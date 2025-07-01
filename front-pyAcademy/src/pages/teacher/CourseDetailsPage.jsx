//React
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

//Api
import { getStudentByCourse, getCourseUnits } from '@/shared/api/api';

//Components
import { CourseDetailsTab } from './components/CourseDetailsTab';
import { CourseStudents } from './components/CourseStudents';
import { CourseUnits } from './components/CourseUnits';
import CourseDashboard from '../ExplorateCourses/CourseDashboard';

function CourseStudentsPage() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [course, setCourse] = useState(JSON.parse(sessionStorage.getItem('Course')) || {});
  const { id: courseId } = useParams();

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['courseStudents', courseId],
    queryFn: () => getStudentByCourse(courseId),
  });
  const {
    data: responseUnits,
    isLoadingUnits,
    isErrorUnits,
    errorUnits,
  } = useQuery({
    queryKey: ['courseUnits', courseId],
    queryFn: () => getCourseUnits(courseId),
  });

  const students = response?.data || response || [];
  const units = responseUnits?.data || response || [];

  console.log(';as unidades son', units);

  return (
    <section className="md:px-10min-h-screen">
      <header className="-m-8 mb-8 bg-white flex justify-between items-center dark:bg-primary-pri4 py-5 px-4 border-y">
        <div className="flex gap-7">
          <NavLink to={'/teacher'} className={'flex gap-3 items-center hover:text-blue-400'}>
            {<IoIosArrowRoundBack className="text-title-lg" />}Volver a Cursos
          </NavLink>
          <p>|</p>
          <h1 className="text-title-md font-semibold">{course.name}</h1>
        </div>
      </header>
      <CourseDetailsTab activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'tab1' && <CourseStudents students={students} />}
      {activeTab === 'tab2' && <CourseUnits />}
      {activeTab === 'tab3' && <CourseDashboard course={course} units={units} />}
    </section>
  );
}

export default CourseStudentsPage;
