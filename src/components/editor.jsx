import React from "react";
import { Editor } from "@monaco-editor/react";

const MyEditor = ({ minimap, textSize, code, setCode, language }) => {
  const editorRef = React.useRef(null);

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();

    // Define the custom theme
    monaco.editor.defineTheme("my-custom-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "custom-info", foreground: "a3a7a9", background: "ffffff" },
        { token: "custom-error", foreground: "ee4444" },
        { token: "custom-notice", foreground: "1055af" },
        { token: "custom-date", foreground: "20aa20" },
      ],
      colors: {
        "editor.background": "#010d18",
      },
    });

    monaco.editor.setTheme("my-custom-theme");
  };

  return (
    <Editor
      options={{
        minimap: {
          enabled: minimap,
        },
        fontSize: textSize,
      }}
      height={`100%`}
      theme="my-custom-theme"
      defaultLanguage={"javascript"}
      language={language}
      value={code}
      onChange={(value) => {
        setCode(value);
      }}
      onMount={onMount}
      className="pt-3"
    />
  );
};

export default MyEditor;
