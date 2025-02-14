import React from "react";
import "./App.css";
import LanguageSelector from "./components/languageSelector";
import Topbar from "./components/topbar";
import MyEditor from "./components/editor";
import Bottombar from "./components/bottombar";
import { FaPlay } from "react-icons/fa";
import Output from "./components/output";
import { executeCode, runtimeLanguages } from "./api";
import FontSizeSelector from "./components/textSizeSelector";
import { MdDocumentScanner } from "react-icons/md";
import axios from "axios";
import AIChat from "./components/AIChat";

const CODE_SNIPPETS = {
  python: `def greet(name):\n\tprint("Buy CodeEditor Pro to remove ads, " + name + "!")\n\ngreet("Alex")\n`,
  java: `public class CodeEditorProAd {
\tpublic static void main(String[] args) {
\t\tSystem.out.println("Buy CodeEditor Pro to remove ads");
\t}
}
`,
  c: `#include <stdio.h>\n\nint main() {\n\tprintf("Buy CodeEditor Pro to remove ads");\n\treturn 0;\n}\n`,
  csharp:
    'using System;\n\nnamespace CodeEditorProAd\n{\n\tclass AdMessage { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Buy CodeEditor Pro to remove ads");\n\t\t}\n\t}\n}\n',
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Buy CodeEditor Pro to remove ads";\n\treturn 0;\n}\n`,
  javascript: `function greet(name) {\n\tconsole.log("Buy CodeEditor Pro to remove ads, " + name + "!");\n}\n\ngreet("Alex");\n`,
};

function App() {
  const [minimap, setMinimap] = React.useState(true);
  const [textSize, setTextSize] = React.useState(13);
  const [language, setLanguage] = React.useState("cpp");
  const [code, setCode] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const runCode = async () => {
    if (code == "") {
      alert("Please write some code to run");
      return;
    }
    alert(code);
    try {
      setIsLoading(true);
      const data = await executeCode(language, code);
      setIsLoading(false);
      setOutput(data.run.output);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const getRuntimes = async () => {
    try {
      const data = await runtimeLanguages();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    // getRuntimes();
    setCode(CODE_SNIPPETS[language]);
  }, []);

  const [review, setReview] = React.useState("");
  const reviewCode = async () => {
    if (code == "") {
      alert("Please write some code to run");
      return;
    }
    const response = await axios.post("https://code-helper-server-beige.vercel.app/api/v1/generate", {
      code: code,
    });
    console.log(response);
    setReview(response.data);
  };

  return (
    <section className={`transition-all duration-1000`}>
      <Topbar />
      <main className="bg-[#010d18] h-[calc(100vh-75px)] w-screen flex items-center justify-between">
        <section className="w-full flex h-full p-[6px]">
          <div className="flex flex-col gap-[6px] h-full w-[52%] bg-[#010d18] rounded-lg">
            <div
              className={`relative h-[46px] w-full border-b border-white/10 bg-[#010d18] rounded-t-lg flex items-center justify-between gap-2 px-2`}
            >
              <ul className="absolute bottom-0">
                <li className="active text-[13px] py-1.5 px-2 rounded-t-lg bg-white/10 relative overflow-hidden">
                  {" "}
                  <span className="h-[3px] w-full absolute bottom-0 left-0 bg-[#5413ab]"></span>
                  Main.
                  {(() => {
                    switch (language) {
                      case "python":
                        return "py";
                      case "java":
                        return "java";
                      case "c":
                        return "c";
                      case "csharp":
                        return "cs";
                      case "cpp":
                        return "cpp";
                      case "javascript":
                        return "js";
                      default:
                        return null;
                    }
                  })()}
                </li>
              </ul>
              <span></span>
              <div className="flex gap-2">
                <div
                  onClick={(onClick) => setMinimap(!minimap)}
                  className={`cursor-pointer relative w-max rounded-md ${
                    minimap ? "bg-[#5413ab]" : "bg-white/10"
                  } hover:bg-[#5413ab]/80 text-[12px] flex items-center justify-center px-4 py-1.5 gap-2 font-[600]`}
                >
                  <MdDocumentScanner className="text-[0.8rem]" />
                  Minimap
                </div>
                <FontSizeSelector
                  textSize={textSize}
                  setTextSize={setTextSize}
                />
                <LanguageSelector
                  language={language}
                  setLanguage={setLanguage}
                  setCode={setCode}
                />
                <div
                  onClick={runCode}
                  className="cursor-pointer relative w-max rounded-md bg-[#5413ab] hover:bg-[#5413ab]/80 text-[12px] flex items-center justify-center px-4 py-1.5 gap-2 font-[600]"
                >
                  <FaPlay className="text-[0.8rem]" />
                  Run
                </div>
                <div
                  onClick={reviewCode}
                  className="cursor-pointer relative w-max rounded-md bg-amber-500 hover:bg-amber-600 text-[12px] flex items-center justify-center px-4 py-1.5 gap-2 font-[600]"
                >
                  <FaPlay className="text-[0.8rem]" />
                  Review
                </div>
              </div>
            </div>
            <div className="h-[calc(100%-12px)] flex flex-col gap-[6px]">
              <div className="w-full h-[calc(100%-210px)] border border-[#1d2b4d] rounded-lg overflow-hidden">
                <MyEditor
                  language={language}
                  code={code}
                  setCode={setCode}
                  minimap={minimap}
                  textSize={textSize}
                />
              </div>
              <Output
                output={output}
                setOutput={setOutput}
                isLoading={isLoading}
              />
            </div>
          </div>
          <div
            className={`h-full w-[48%] bg-[#010d18] border border-[#1d2b4d] rounded-lg ml-[6px] flex flex-col`}
          >
            <AIChat review={review} />
          </div>
        </section>
      </main>
      <Bottombar />
    </section>
  );
}

export default App;
