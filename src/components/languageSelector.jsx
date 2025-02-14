import React from "react";
import { GoFileCode } from "react-icons/go";

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

const LanguageSelector = ({ language, setLanguage, setCode }) => {
  const [open, setOpen] = React.useState(false);

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer relative w-max rounded-md bg-white/10 hover:bg-[rgba(255,255,255,0.07)] text-[12px] flex items-center justify-center min-w-[100px] px-4 py-1.5 gap-2 font-[600]"
      >
        <GoFileCode className="text-[1.05rem]" />
        {language &&
          (() => {
            switch (language) {
              case "python":
                return <span>Python</span>;
              case "java":
                return <span>Java</span>;
              case "c":
                return <span>C</span>;
              case "csharp":
                return <span>C#</span>;
              case "cpp":
                return <span>C++</span>;
              case "javascript":
                return <span>Javascript</span>;
              default:
                return null;
            }
          })()}
      </div>
      {open && (
        <div className="z-[999] absolute top-[35px] rounded-md bg-slate-900 border border-white/10 min-h-[35px] min-w-[100px] flex flex-col p-1">
          {languages.map((lang) => (
            <div
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setCode(CODE_SNIPPETS[lang]);
                setOpen(false);
              }}
              className="cursor-pointer rounded hover:bg-white/10 px-3 py-1 text-[14px]"
            >
              {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

const languages = ["python", "java", "c", "csharp", "cpp", "javascript"];

function useOutsideAlerter(ref, setOpen) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setOpen]);
}
