import { useNavigate } from 'react-router-dom';

import Select from '../../shared/ui/atoms/Select';

import { ExcerciseCard } from './components/ExcerciseCard';

function ExercisesPage() {
  const navigation = useNavigate();
  const exercises = [
    {
      title: 'Contador de Vocales',
      description: 'Crea una función que cuente la cantidad de vocales en una cadena de texto.',
      tags: ['Strings', 'Condicionales'],
      category: 'Principiante',
      instruction:
        'Define una función que reciba un string y devuelva la cantidad de vocales que contiene.',
      testCase: {
        description: 'Debe contar correctamente las vocales',
        input: 'programacion',
        output: '5',
      },
    },
    {
      title: 'FizzBuzz Extendido',
      description:
        "Implementa el clásico problema FizzBuzz con una pequeña variación: imprime 'FizzBuzz' si es divisible entre 3 y 5, 'Fizz' si solo entre 3, 'Buzz' si solo entre 5, y el número si no cumple ninguna.",
      tags: ['Condicionales', 'Bucles'],
      category: 'Principiante',
      instruction: 'Imprime la secuencia del 1 al 20 con la lógica indicada.',
      testCase: {
        description: 'Debe imprimir correctamente el valor para el número 15',
        input: '15',
        output: 'FizzBuzz',
      },
    },
    {
      title: 'Palíndromo Detector',
      description: 'Verifica si una palabra es un palíndromo (se lee igual al derecho y al revés).',
      tags: ['Strings', 'Logica'],
      category: 'Intermedio',
      instruction: "Crea una función que retorne 'true' si la palabra es un palíndromo.",
      testCase: {
        description: 'Debe identificar correctamente el palíndromo',
        input: 'reconocer',
        output: 'true',
      },
    },
    {
      title: 'Ordenar Números',
      description: 'Recibe una lista de números y ordénalos de menor a mayor.',
      tags: ['Arreglos', 'Algoritmos de Ordenamiento'],
      category: 'Intermedio',
      instruction: 'No uses funciones integradas de ordenamiento.',
      testCase: {
        description: 'Debe ordenar la lista correctamente',
        input: '[5, 2, 8, 1]',
        output: '[1, 2, 5, 8]',
      },
    },
    {
      title: 'Ruta Óptima del Tesoro',
      description:
        'En una cuadrícula representada como una matriz, encuentra la ruta más corta desde el punto A hasta el tesoro T evitando obstáculos.',
      tags: ['Backtracking', 'Grafos', 'Algoritmos'],
      category: 'Avanzado',
      instruction: 'Usa búsqueda como BFS o DFS para hallar el camino.',
      testCase: {
        description: 'Debe encontrar una ruta válida al tesoro',
        input: '[[A,0,0],[1,1,0],[T,0,0]]',
        output: 'Ruta encontrada en 4 pasos',
      },
    },
  ];

  return (
    <div>
      <header>
        <div>
          <h1 className="text-title-md font-bold">Ejercicios de Programacion</h1>
          {/* <div>Barra de progreso</div> */}
          <div className="flex gap-5 my-10">
            <Select placeholder={'Dificultades'} />
            <Select placeholder={'Tema'} />
          </div>
        </div>
      </header>

      <div>
        {exercises &&
          exercises.map((exercise, key) => {
            return <ExcerciseCard key={key} exercise={exercise} btnText={'Resolver'} />;
          })}
      </div>
    </div>
  );
}
export default ExercisesPage;
