import Editor from '@monaco-editor/react';

// Accept props from the parent
export default function CodeEditor({ code, setCode }) {
  return (
    <Editor
      height="60vh"
      theme="vs-dark"
      defaultLanguage="cpp"
      value={code}
      onChange={(value) => setCode(value || "")}
    />
  );
}