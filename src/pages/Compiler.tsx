import { useState } from "react";
import {
  Check,
  Code2,
  Copy,
  Loader2,
  Play,
  RotateCcw,
  Terminal,
} from "lucide-react";
import Editor from "../Editor";

const CPP_STARTER = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, Coding Gurukul!" << endl;
    return 0;
}`;

const JAVA_STARTER = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Coding Gurukul!");
    }
}`;

const PYTHON_STARTER = `print("Hello, Coding Gurukul!")`;

const LANGUAGES = {
  cpp: {
    label: "C++",
    languageId: 54,
    editorLanguage: "cpp",
    filename: "main.cpp",
    starterCode: CPP_STARTER,
  },
  java: {
    label: "Java",
    languageId: 62,
    editorLanguage: "java",
    filename: "Main.java",
    starterCode: JAVA_STARTER,
  },
  python: {
    label: "Python",
    languageId: 71,
    editorLanguage: "python",
    filename: "main.py",
    starterCode: PYTHON_STARTER,
  },
} as const;

type LanguageKey = keyof typeof LANGUAGES;

type Judge0Response = {
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
  status?: {
    id: number;
    description: string;
  };
};

function getExecutionOutput(result: Judge0Response) {
  const output = [result.compile_output, result.stderr, result.stdout, result.message]
    .filter(Boolean)
    .join("\n")
    .trim();

  if (output) return output;
  if (result.status && result.status.id !== 3) return result.status.description;
  return "Program finished successfully with no output.";
}

export default function Compiler() {
  const [language, setLanguage] = useState<LanguageKey>("cpp");
  const [codeByLanguage, setCodeByLanguage] = useState<Record<LanguageKey, string>>({
    cpp: CPP_STARTER,
    java: JAVA_STARTER,
    python: PYTHON_STARTER,
  });
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("Run your code to see the output here.");
  const [isLoading, setIsLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [copied, setCopied] = useState(false);
  const activeLanguage = LANGUAGES[language];
  const code = codeByLanguage[language];

  const setCode = (value: string) => {
    setCodeByLanguage((current) => ({ ...current, [language]: value }));
  };

  const handleLanguageChange = (nextLanguage: LanguageKey) => {
    setLanguage(nextLanguage);
    setOutput("Run your code to see the output here.");
    setHasRun(false);
  };

  const handleRun = async () => {
    if (!code.trim() || isLoading) return;

    setIsLoading(true);
    setHasRun(true);
    setOutput("Compiling and running...");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(
        "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            language_id: activeLanguage.languageId,
            source_code: code,
            stdin,
            cpu_time_limit: 5,
            wall_time_limit: 10,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Compilation server returned ${response.status}.`);
      }

      const result: Judge0Response = await response.json();
      setOutput(getExecutionOutput(result));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setOutput("Execution timed out. Please check your code for an infinite loop and try again.");
      } else {
        const message = error instanceof Error ? error.message : "Unknown error";
        setOutput(`Failed to connect to the compilation server. ${message}`);
      }
    } finally {
      window.clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCode(activeLanguage.starterCode);
    setStdin("");
    setOutput("Run your code to see the output here.");
    setHasRun(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="space-y-5 pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-400">
            <Code2 className="h-4 w-4" />
            Online IDE
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">Online Compiler</h1>
          <p className="mt-2 text-sm text-slate-400">
            Write, compile, and test C++, Java, or Python directly in the browser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            type="button"
            onClick={handleRun}
            disabled={isLoading || !code.trim()}
            className="inline-flex h-10 min-w-32 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 fill-current" />}
            {isLoading ? "Running..." : "Run code"}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#10131a] shadow-2xl shadow-black/20">
        <div className="flex h-11 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-semibold text-slate-400">{activeLanguage.filename}</span>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            Language
            <select
              value={language}
              onChange={(event) => handleLanguageChange(event.target.value as LanguageKey)}
              disabled={isLoading}
              aria-label="Programming language"
              className="rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs font-semibold text-blue-400 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {Object.entries(LANGUAGES).map(([key, option]) => (
                <option key={key} value={key}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <Editor
          code={code}
          setCode={setCode}
          onRun={handleRun}
          language={activeLanguage.editorLanguage}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
          <div className="flex h-11 items-center gap-2 border-b border-slate-800 px-4 text-sm font-bold text-slate-200">
            <Terminal className="h-4 w-4 text-blue-400" />
            Program input
          </div>
          <textarea
            value={stdin}
            onChange={(event) => setStdin(event.target.value)}
            placeholder="Enter input values here (stdin)..."
            spellCheck={false}
            className="min-h-40 w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
          <div className="flex h-11 items-center justify-between border-b border-slate-800 px-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <Terminal className="h-4 w-4 text-emerald-400" />
              Output
              {hasRun && !isLoading && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
            </div>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!hasRun || isLoading}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre
            aria-live="polite"
            className={`min-h-40 overflow-auto whitespace-pre-wrap p-4 font-mono text-sm leading-6 ${
              isLoading ? "text-amber-300" : hasRun ? "text-emerald-300" : "text-slate-500"
            }`}
          >
            {output}
          </pre>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500">
        Tip: Press <kbd className="rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5">Ctrl</kbd> +{" "}
        <kbd className="rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5">Enter</kbd> to run your code.
      </p>
    </section>
  );
}
