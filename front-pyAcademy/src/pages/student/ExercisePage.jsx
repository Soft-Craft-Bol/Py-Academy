//React
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BsBook } from "react-icons/bs";
import { GiBurningBook } from "react-icons/gi";
import { GiEvilBook } from "react-icons/gi";
import { IoIosArrowRoundBack } from "react-icons/io";

//Componentes
import PythonEditor from "./PyEditorPage";

const ExercisePage = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const onEvaluation = (output) => {
    console.log(output);
    if (output === data.testCase.output) {
      window.alert("Correcto");
    } else {
      window.alert("Incorrecto");
    }
  };
  const DescriptorElement = ({ title, descripcion, input, output, icon }) => {
    return (
      <div>
        <h3 className="flex gap-2 items-center">
          {icon && icon}
          {title}
        </h3>
        <p className="p-3 bg-primary-pri4 border rounded-md my-4">
          {descripcion}
          {input && (
            <p>
              <span className="text-blue-400">Entrada: {input}</span>
            </p>
          )}
          {output && (
            <p>
              <span className="text-green-500">Salida: </span>
              {output}
            </p>
          )}
        </p>
      </div>
    );
  };

  return (
    <div className="-m-8">
      <header className="flex justify-between items-center dark:bg-primary-pri4 py-5 px-4 border-t">
        <div className="flex gap-7">
          <NavLink
            to={"/student/exercises"}
            className={"flex gap-3 items-center hover:text-blue-400"}
          >
            {<IoIosArrowRoundBack className="text-title-lg" />}Volver a
            Ejercicios
          </NavLink>
          <p>|</p>
          <h1 className="text-title-sm font-semibold">{data.title}</h1>
        </div>
        <p className="bg-green-500 p-1 rounded-md h-[90%]">{data.category}</p>
      </header>
      <div className="flex">
        <section className="dark:bg-gradient-2 w-[40%] h-screen p-5 sticky top-0">
          <DescriptorElement
            title={"Descripción"}
            descripcion={data.description}
            icon={<BsBook />}
          />
          <DescriptorElement
            title={"Instrucciones"}
            descripcion={data.instruction}
            icon={<GiBurningBook className="text-label-lg" />}
          />

          <DescriptorElement
            title={"Casos de Prueba"}
            descripcion={data.testCase.description}
            input={data.testCase.input}
            output={data.testCase.output}
            icon={<GiEvilBook className="text-label-lg" />}
          />
        </section>
        <section className="w-[60%]">
          <PythonEditor title={false} onEvaluation={onEvaluation} />
        </section>
      </div>
    </div>
  );
};

export default ExercisePage;
