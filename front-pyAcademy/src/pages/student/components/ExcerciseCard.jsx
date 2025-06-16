import React from "react";
import Button from "../../../shared/ui/atoms/Button";

export const ExcerciseCard = ({ exercise, btnText }) => {
  return (
    <div className="p-6 bg-white dark:bg-primary-pri4 rounded-lg mt-10 hover:scale-[1.02] transition-scale duration-300">
      <div className="flex justify-between">
        <h2 className="font-semibold text-title-sm">{exercise.title}</h2>
        <span className="text-label-md">✔</span>
      </div>
      <p className="text-gray-500 dark:text-gray-300 my-4">
        {exercise.description}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <p className="bg-green-500 p-1 rounded-md h-[90%]">
            {exercise.category}
          </p>
          <div>
            <p>Tags:</p>
            <ul className="flex">
              {exercise.tags &&
                exercise.tags.map((tag, key) => {
                  return <li key={key}>{tag},</li>;
                })}
            </ul>
          </div>
        </div>
        <Button to={"/student/exercise"} data={exercise}>
          {btnText}
        </Button>
      </div>
    </div>
  );
};
