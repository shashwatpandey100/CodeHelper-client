import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  c: "10.2.0",
  cpp: "10.2.0",
  javascript: "18.15.0",
};

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language: language,
    version: `${LANGUAGE_VERSIONS[language]}`,
    files: [
      {
        content: sourceCode,
      },
    ],
  });

  return response.data;
};

export const runtimeLanguages = async () => {
  const response = await API.get("/runtimes");
  return response.data;
}
