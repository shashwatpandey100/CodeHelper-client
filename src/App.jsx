import React from "react";
import "./App.css";
import LanguageSelector from "./components/languageSelector";
import MyEditor from "./components/editor";
import Bottombar from "./components/bottombar";
import { FaPlay } from "react-icons/fa";
import Output from "./components/output";
import { executeCode, runtimeLanguages } from "./api";
import FontSizeSelector from "./components/textSizeSelector";
import { MdDocumentScanner } from "react-icons/md";
import axios from "axios";
import AIChat from "./components/AIChat";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";

const CODE_SNIPPETS = {
  python: `print("Hello, World!")`,
  java: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
  }`,
  c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\\n");\n\treturn 0;\n}\n`,
  csharp: `using System;\n\nclass Program {\n\tstatic void Main() {\n\t\tConsole.WriteLine("Hello, World!");\n\t}\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello, World!\\n";\n\treturn 0;\n}\n`,
  javascript: `console.log("Hello, World!");`,
};

function App() {
  const [minimap, setMinimap] = React.useState(true);
  const [textSize, setTextSize] = React.useState(13);
  const [language, setLanguage] = React.useState("cpp");
  const [code, setCode] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReviewLoading, setIsReviewLoading] = React.useState(false);
  const [isIdol, setIsIdol] = React.useState(true);

  const runCode = async () => {
    if (code == "") {
      alert("Please write some code to run");
      return;
    }
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
    setIsReviewLoading(true);
    setIsIdol(false);
    if (code == "") {
      alert("Please write some code to run");
      return;
    }
    const response = await axios.post(
      "https://code-helper-server-beige.vercel.app/api/v1/generate",
      // "http://localhost:8000/api/v1/generate",
      {
        code: code,
        question: question,
      }
    );
    setReview(response.data);
    setIsReviewLoading(false);
  };

  return (
    <section className={`transition-all duration-1000`}>
      <main className="bg-[#010d18] h-[calc(100vh-25px)] w-screen flex items-center justify-between">
        <section className="w-full flex h-full">
          <div className="flex flex-col h-full w-[48%] bg-[#010d18] rounded-lg">
            <div
              className={`relative h-[50px] w-full border-b border-white/10 bg-[#010d18] rounded-t-lg flex items-center justify-between gap-2 pl-4 pr-2`}
            >
              <li className="absolute h-10 flex items-center justify-center bottom-0 active text-[13px] py-1.5 px-3 rounded-t-lg bg-[rgba(255,255,255,0.07)] overflow-hidden">
                <svg
                  height="100%"
                  viewBox="0 0 70 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5"
                >
                  <path
                    d="M24.3493 3.6048V0H28.5979V3.6048H24.3493ZM24.4854 18.7728V5.424H28.4861V18.7824H24.4854V18.7728Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M32.0153 18.7776V5.424H35.8799V7.3488C36.1764 6.8496 36.5313 6.4272 36.9639 6.0768C37.3965 5.7264 37.8632 5.4624 38.3785 5.2752C38.8938 5.088 39.4382 4.9968 40.0264 4.9968C40.9208 4.9968 41.7035 5.2128 42.3597 5.64C43.0208 6.0672 43.5556 6.648 43.9785 7.3776C44.5618 6.5424 45.2327 5.9328 45.9958 5.5584C46.7493 5.184 47.6146 4.9968 48.5917 4.9968C49.4715 4.9968 50.2396 5.1648 50.9104 5.4912C51.5764 5.8176 52.1111 6.3552 52.5146 7.08C52.9181 7.8096 53.1174 8.736 53.1174 9.8544V18.7728H49.0875V10.656C49.0875 9.8208 48.9028 9.1968 48.5382 8.7984C48.1736 8.3952 47.6583 8.1984 47.0021 8.1984C46.2875 8.1984 45.7479 8.4 45.3688 8.7984C44.9896 9.1968 44.7563 9.6624 44.6688 10.176C44.5813 10.6896 44.5326 11.2704 44.5326 11.9136V18.7776H40.5854V10.656C40.5854 9.8208 40.4007 9.1968 40.0361 8.7984C39.6715 8.3952 39.1563 8.1984 38.5 8.1984C37.766 8.1984 37.2215 8.4 36.8521 8.7984C36.4875 9.2016 36.2542 9.6528 36.1667 10.1616C36.0792 10.6704 36.0306 11.2512 36.0306 11.9136V18.7776H32.0202H32.0153Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M0 4.9968H8.50694V8.1936H12.5417V4.9968H17.0868V8.1936H21.1361V18.7824H17.0868V8.1888H12.5417V18.7776H8.50694V8.1888H3.99583V18.7776H0V4.9968Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M62.7229 4.9872C58.7028 4.9872 55.4458 8.1696 55.4458 12.096C55.4458 16.0224 58.4549 19.2048 62.7229 19.2048C66.991 19.2048 70 16.0224 70 12.096C70 8.1696 66.7431 4.9872 62.7229 4.9872ZM62.7229 15.9312C60.7785 15.9312 59.1986 14.2128 59.1986 12.0912C59.1986 9.9696 60.7785 8.2512 62.7229 8.2512C64.6674 8.2512 66.2472 9.9696 66.2472 12.0912C66.2472 14.2128 64.6674 15.9312 62.7229 15.9312Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </li>
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
              </div>
            </div>
            <div className="h-[calc(100%-50px)] flex flex-col">
              <div className="w-full h-[calc(100%-160px)] overflow-hidden">
                <MyEditor
                  language={language}
                  code={code}
                  setCode={setCode}
                  minimap={minimap}
                  textSize={textSize}
                />
              </div>
              <div className="mb-[6px]">
                <Output
                  output={output}
                  setOutput={setOutput}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
          <div
            className={`h-full w-[52%] bg-[#010d18] border-l border-[#1d2b4d65] flex flex-col`}
          >
            <AIChat
              review={review}
              reviewCode={reviewCode}
              code={code}
              question={question}
              setQuestion={setQuestion}
              isReviewLoading={isReviewLoading}
              isIdol={isIdol}
            />
          </div>
        </section>
      </main>
      <Bottombar />
    </section>
  );
}

export default App;
