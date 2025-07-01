export const CourseDetailsTab = ({ activeTab, setActiveTab }) => {
  return (
    <div className="-m-8 mb-8 bg-white flex justify-evenly items-center dark:bg-primary-pri4 py-4 px-4 border-y">
      <button
        className={`px-4 py-2 ${activeTab === 'tab1' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
        onClick={() => setActiveTab('tab1')}
      >
        Estudiantes
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'tab2' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
        onClick={() => setActiveTab('tab2')}
      >
        Unidades del curso
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'tab3' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
        onClick={() => setActiveTab('tab3')}
      >
        Previsualización
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'tab4' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
        onClick={() => setActiveTab('tab4')}
      >
        Recursos
      </button>
    </div>
  );
};
