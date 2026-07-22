import { useEffect, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";

type CodeEditorProps={
  code: string;
  setCode: (value:string)=>void;
  onRun?: () => void;
};
export default function CodeEditor({ code, setCode, onRun }: CodeEditorProps) {
  const onRunRef = useRef(onRun);
  useEffect(() => {
    onRunRef.current = onRun;
  }, [onRun]);
  const handleMount: OnMount = (_editor, monaco) => {
    _editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => onRunRef.current?.());
  };
  return (
    <Editor
      height="58vh"
      theme="vs-dark"
      defaultLanguage="cpp"
      value={code}
      onChange={(value) => setCode(value || "")}
      onMount={handleMount}
      loading={<div className="flex h-full items-center justify-center text-sm text-slate-500">Loading editor...</div>}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineHeight: 22,
        fontLigatures: true,
        padding: { top: 16, bottom: 16 },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        automaticLayout: true,
        tabSize: 4,
        wordWrap: "on",
        bracketPairColorization: { enabled: true },
      }}
    />
  );
}
