//React
import { useNavigate } from "react-router-dom";

//Componentes
import Select from "../../shared/ui/atoms/Select";
import { ExcerciseCard } from "./components/ExcerciseCard";

const ExercisesPage = () => {
  const navigation = useNavigate();
  const exercises = [
    {
      title: "Serpiente recursiva",
      description:
        "Resuelve el emocionante juego de la vibora recursiva, en donde tienes que aplicar diversas tecnicas de programacion",
      tags: ["Recursion", "Programacion Dinamica"],
      category: "Principiante",
      instruction: "Usa la funcion print() para mostrar el mensaje",
      testCase: {
        description: "Debe imprimir el mensaje correcto",
        input: " ",
        output: "Hola, mundo!",
      },
    },
    {
      title: "Busqueda del Gato",
      description: "Resuelve el emocionante juego del gato escondidizo",
      tags: ["Busqueda Binaria", "Laberintos"],
      category: "Intermedio",
      instruction: "Usa la funcion print() para mostrar el mensaje",
      testCase: {
        description: "Debe imprimir el mensaje correcto",
        input: " ",
        output: "Hola, mundo!",
      },
    },
  ];

  return (
    <div>
      <header>
        <div>
          <h1 className="text-title-md font-bold">
            Ejercicios de Programacion
          </h1>
          {/* <div>Barra de progreso</div> */}
          <div className="flex gap-5 my-10">
            <Select placeholder={"Dificultades"} />
            <Select placeholder={"Tema"} />
          </div>
        </div>
      </header>

      <div>
        {exercises &&
          exercises.map((exercise, key) => {
            return (
              <ExcerciseCard
                key={key}
                exercise={exercise}
                btnText={"Resolver"}
              />
            );
          })}
      </div>
    </div>
  );
};
export default ExercisesPage;
