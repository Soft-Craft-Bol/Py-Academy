//Components
import Button from "../../shared/ui/atoms/Button";

//React
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { IoIosColorPalette } from "react-icons/io";

//assets
import { executeCode } from "../../shared/api/api";

const CodeEditorPage = () => {
  const [code, setCode] = useState("print('Hola mundo')");
  const [output, setOutput] = useState("");
  const [themeEditor, setThemeEditor] = useState("vs");

  const handleExecuteCode = async () => {
    const res = await executeCode(JSON.stringify({ code }));
    console.log(res);
    setOutput(res.data);
  };

  const handleThemeEditor = () => {
    if (themeEditor == "vs") setThemeEditor("vs-dark");
    if (themeEditor == "vs-dark") setThemeEditor("hc-black");
    if (themeEditor == "hc-black") setThemeEditor("vs");
  };

  return (
    <div className="mt-10 mx-auto w-[90%]">
      <div className="bg-primary-pri2 dark:bg-primary-pri1 p-7 rounded-lg shadow-blue-500/50 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="p-1 rounded-lg text-center font-bold text-title-md text-white">
            Editor de codigo Python
          </h1>

          <div className="flex gap-5 items-center">
            <IoIosColorPalette
              className="text-3xl text-primary-pri4"
              onClick={handleThemeEditor}
            />

            <Button
              variant="primary"
              size="large"
              onClick={handleExecuteCode}
              className="bg-primary-pri3 px-4 py-2"
            >
              Ejecutar
            </Button>
          </div>
        </div>

        <h2 className="font-semibold my-4 text-label-md text-white">Entrada</h2>

        <div>
          <Editor
            height="300px"
            language="python"
            value={code}
            onChange={(value) => setCode(value)}
            theme={themeEditor}
          />
          <h2 className="font-semibold my-4 text-label-md text-white">
            Salida
          </h2>
          <pre className="text-black bg-white p-2">{output}</pre>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default CodeEditorPage;
