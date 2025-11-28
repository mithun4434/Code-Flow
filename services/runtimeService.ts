import { LANGUAGES } from '../constants';
import { LanguageMode, ExecutionResult } from '../types';

const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

export const executeCode = async (
  code: string,
  language: LanguageMode,
  stdin: string = ''
): Promise<ExecutionResult> => {
  const config = LANGUAGES[language];

  if (!config) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const payload = {
    language: config.pistonRuntime,
    version: config.pistonVersion,
    files: [
      {
        name: config.filename,
        content: code,
      },
    ],
    stdin: stdin,
    compile_timeout: 10000,
    run_timeout: 5000,
    run_memory_limit: -1, // Piston default
  };

  try {
    const response = await fetch(PISTON_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Execution failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result as ExecutionResult;
  } catch (error: any) {
    console.error('Piston API Error:', error);
    // Fallback simulation if API fails (usually due to network restrictions in some envs)
    // But for this app, we expect connectivity.
    throw new Error(error.message || 'Failed to execute code on remote sandbox.');
  }
};
