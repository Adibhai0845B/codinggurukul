import { useState } from 'react';
import Editor from '../Editor'; // Adjust path if needed

export default function Compiler() {
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");
  const handleRun = async () => {
    // 1. Show the user that something is happening
    console.log("Compiling...");

    try {
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            language: "cpp", // this will change baad mai
            version: "*",
            files: [{ content: code }],
        }),
        });

        const result = await response.json();
        setOutput(result.run.stdout || result.run.stderr || "No output generated");
        // 2. Log the output to check it works
        console.log("Execution Result:", result.run.stdout);
        
        // Once you have the output, you can create a new 'output' state
        // and display it in a box below your editor!
    } catch (error) {
        console.error("Error executing code:", error);
        console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Coding Gurukul Compiler</h1>
      
      {/* Pass code and setCode as props to the Editor */}
      <Editor code={code} setCode={setCode} />
      
      <button 
        onClick={handleRun}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Run Code
      </button>
      <div className="mt-6 p-4 bg-gray-900 text-green-400 rounded border border-gray-700">
        <h2 className="font-bold text-white mb-2">Output:</h2>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
}