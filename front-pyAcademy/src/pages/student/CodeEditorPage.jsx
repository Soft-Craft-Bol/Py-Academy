//Components
import Button from "../../shared/ui/atoms/Button";

//React
import Editor from "@monaco-editor/react";
import { useState } from "react";

const CodeEditorPage = () => {
  const [code, setCode] = useState("print('Hola mundo')");
  const [output, setOutput] = useState("");

  const handleExecuteCode = (value) => {
    console.log("Ejecutar código", value);
  };

  return (
    <div className="mt-10 mx-auto w-[90%]">
      <div className="dark:bg-primary-pri1 p-7 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="p-1 rounded-lg text-center font-bold text-title-md">
            Simulador visual del comportamiento del código
          </h1>
          <Button
            variant="primary"
            size="large"
            onClick={() => {
              console.log("Ejecutar");
            }}
            className="bg-primary-pri3 px-4 py-2"
          >
            Ejecutar
          </Button>
        </div>

        <h2 className="font-semibold my-4 text-label-md">Editor de Python</h2>

        <div>
          <Editor
            height="300px"
            language="python"
            value={code}
            onChange={(value) => setCode(value)}
          />
          <button onClick={handleExecuteCode}>Ejecutar</button>
          <pre style={{ background: "#eee", padding: "1em" }}>{output}</pre>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default CodeEditorPage;
