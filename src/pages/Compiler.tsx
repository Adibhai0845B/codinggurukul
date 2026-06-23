import { useState } from 'react';
import Editor from '../Editor'; // Adjust path if needed

export default function Compiler() {
  const [code, setCode] = useState("// Write your code here");

  const handleRun = async () => {
    console.log("Compiler page is running this code:", code);
    // Soon, your fetch() call goes here!
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
    </div>
  );
}