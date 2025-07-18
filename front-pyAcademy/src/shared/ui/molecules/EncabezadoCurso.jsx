import { Bell, User } from 'lucide-react';
import PropTypes from 'prop-types';

const EncabezadoCurso = ({ courseData }) => {
  console.log("props", courseData);
  
  return (
    <header className="h-18 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 shadow-lg p-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{courseData.name}</h1>
            <p className="text-blue-100">{courseData.description}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-3 text-white hover:text-yellow-200 hover:bg-white/10 rounded-xl transition-all">
          <Bell className="w-6 h-6" />
        </button>
        <button className="p-3 text-white hover:text-yellow-200 hover:bg-white/10 rounded-xl transition-all">
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

EncabezadoCurso.propTypes = {
  courseData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  }).isRequired,
};

export default EncabezadoCurso;
