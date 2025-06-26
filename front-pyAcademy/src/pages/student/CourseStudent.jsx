import { useParams } from 'react-router-dom';
import EncabezadoCurso from '@/shared/ui/molecules/EncabezadoCurso';
import SidebarCurso from '@/shared/ui/organisms/SideBarCurso';
import { VisorFile } from '@/shared/ui/organisms/VisorFile';

const courseData = {
  title: 'Desarrollo Web Avanzado',
  subtitle: 'Curso de Programación Frontend y Backend',
  progress: 25,
  modules: [
    {
      id: 'module1',
      title: 'Módulo 1: Fundamentos de HTML y CSS',
      progress: 75,
      completed: false,
      sections: [
        {
          id: '1.1',
          title: '1.1 Introducción a HTML5',
          completed: true,
          subsections: [
            { id: '1.1.1', title: 'Estructura básica de HTML', completed: true, type: 'reading' },
            { id: '1.1.2', title: 'Etiquetas semánticas', completed: true, type: 'video' },
            { id: '1.1.3', title: 'Formularios y validación', completed: true, type: 'reading' },
          ],
        },
        {
          id: '1.2',
          title: '1.2 CSS Avanzado',
          completed: false,
          subsections: [
            { id: '1.2.1', title: 'Flexbox y Grid', completed: false, type: 'reading' },
            { id: '1.2.2', title: 'Animaciones CSS', completed: false, type: 'video' },
          ],
        },
      ],
    },
    {
      id: 'module2',
      title: 'Módulo 2: JavaScript Moderno',
      progress: 15,
      completed: false,
      sections: [
        {
          id: '2.1',
          title: '2.1 ES6+ Características',
          completed: false,
          subsections: [
            {
              id: '2.1.1',
              title: 'Arrow Functions y Destructuring',
              completed: false,
              type: 'reading',
            },
            { id: '2.1.2', title: 'Promises y Async/Await', completed: false, type: 'video' },
            { id: '2.1.3', title: 'Módulos ES6', completed: false, type: 'reading' },
          ],
        },
        {
          id: '2.2',
          title: '2.2 DOM Manipulation',
          completed: false,
          subsections: [
            {
              id: '2.2.1',
              title: 'Selección y modificación de elementos',
              completed: false,
              type: 'reading',
            },
            { id: '2.2.2', title: 'Event Handling', completed: false, type: 'video' },
          ],
        },
      ],
    },
    {
      id: 'module3',
      title: 'Módulo 3: React Fundamentals',
      progress: 0,
      completed: false,
      sections: [
        {
          id: '3.1',
          title: '3.1 Componentes y Props',
          completed: false,
          subsections: [
            { id: '3.1.1', title: 'Componentes funcionales', completed: false, type: 'reading' },
            { id: '3.1.2', title: 'Estado y Hooks', completed: false, type: 'video' },
          ],
        },
      ],
    },
  ],
};

function CourseStudent() {
  const { id } = useParams();

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <EncabezadoCurso courseData={courseData} />
      <div className="flex flex-1 overflow-hidden">
        <SidebarCurso />
        <main className="flex-1 bg-gray-100 dark:bg-gray-800 p-4 text-gray-500 dark:text-gray-400 overflow-hidden">
          <div className="flex text-center text-lg italic w-full h-full">
            <div className="w-1/2 overflow-y-auto pr-4">
              <VisorFile/>
            </div>
            <div className="w-1/2 p-4 flex items-center justify-center">
            Selecciona una sección del curso para comenzar</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CourseStudent;
