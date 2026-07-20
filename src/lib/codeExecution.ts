export const CONTEST_LANGUAGES = {
  cpp: {
    label: "C++",
    judgeId: 54,
    editorLanguage: "cpp",
    starter: `#include <iostream>
using namespace std;

int main() {
    // Read input, solve the problem, and print the answer.
    return 0;
}`,
  },
  java: {
    label: "Java",
    judgeId: 62,
    editorLanguage: "java",
    starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Read input, solve the problem, and print the answer.
    }
}`,
  },
  python: {
    label: "Python",
    judgeId: 71,
    editorLanguage: "python",
    starter: `# Read input, solve the problem, and print the answer.
`,
  },
} as const;

export type ContestLanguage = keyof typeof CONTEST_LANGUAGES;

type JudgeResult = {
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
  status?: { id: number; description: string };
};

export async function executeCode(sourceCode: string, language: ContestLanguage, stdin: string) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch("https://ce.judge0.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        language_id: CONTEST_LANGUAGES[language].judgeId,
        source_code: sourceCode,
        stdin,
        cpu_time_limit: 5,
        wall_time_limit: 10,
      }),
    });

    if (!response.ok) throw new Error(`Judge server returned ${response.status}.`);
    return (await response.json()) as JudgeResult;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Judging timed out. Please try again.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export function normalizeOutput(output: string) {
  return output.replace(/\r\n/g, "\n").split("\n").map((line) => line.trimEnd()).join("\n").trim();
}
