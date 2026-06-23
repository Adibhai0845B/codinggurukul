import { useState } from 'react';
import Editor from '../Editor'; // Adjust path if needed

export default function Compiler() {
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const handleRun = async () => {
    // 1. Show the user that something is happening
    console.log("Compiling...");
     setIsLoading(true);
    setOutput("Compiling and running...");
    try {
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            language: "cpp", // this will change baad mai
            version: "10.2.0",
            files: [{ name : "main.cpp",content: code }],
        }),
        });

        const result = await response.json();
        if (result.message) {
        setOutput(`API Error: ${result.message}`);
        return;
      }

      // Combine stderr (compile/runtime errors) and stdout so the user sees everything
      const runResult = result.run;
      const combinedOutput = runResult.output || (runResult.stderr + runResult.stdout) || "Code executed successfully with no output.";
      
      setOutput(combinedOutput);
      console.log("Execution Result:", runResult);
        
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Failed to connect to the compilation server.");
    } finally {
      setIsLoading(false); // Reset loading state
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