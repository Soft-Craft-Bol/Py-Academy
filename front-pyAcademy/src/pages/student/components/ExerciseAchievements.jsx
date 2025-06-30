import React from 'react';
import { FaStar, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

export function ExerciseAchievements({ achievements = [] }) {
  if (!achievements.length) return null;
  return (
    <div className="px-6 py-4 mb-5 bg-white dark:bg-primary-pri4 shadow-lg border rounded-lg border-blue-100 dark:border-primary-pri2">
      <div className="flex items-center gap-2 mb-3">
        <FaStar className="text-yellow-400 text-xl" />
        <span className="text-base font-bold text-blue-700 dark:text-blue-200 tracking-wide uppercase">
          Logros de este ejercicio
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
        {achievements.map((ach, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center h-20 rounded-xl border transition-all duration-300 shadow-md p-3 text-center ${ach.completed ? 'bg-gradient-to-br from-green-100 to-green-300 border-green-300 dark:from-green-900/30 dark:to-green-700/30' : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-200 dark:from-gray-800/30 dark:to-gray-700/30 opacity-60'}`}
          >
            <div className="mb-2">
              {ach.completed ? (
                <FaCheckCircle className="text-green-500 text-3xl" />
              ) : (
                <FaRegCircle className="text-gray-400 text-3xl" />
              )}
            </div>
            <span
              className={`text-xs ${ach.completed ? 'text-green-800 dark:text-green-200 font-semibold' : 'text-gray-500 dark:text-gray-300'}`}
            >
              {ach.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
