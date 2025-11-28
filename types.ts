
export enum LanguageMode {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  PYTHON = 'python',
  JAVA = 'java',
  CSHARP = 'csharp',
  CPP = 'cpp',
  C = 'c',
  GO = 'go',
  RUST = 'rust',
  RUBY = 'ruby',
  PHP = 'php',
  SWIFT = 'swift',
  BASH = 'bash',
  SQL = 'sqlite3',
}

export interface LanguageConfig {
  id: LanguageMode;
  name: string;
  pistonRuntime: string;
  pistonVersion: string;
  filename: string;
  boilerplate: string;
}

export interface ExecutionResult {
  run: {
    stdout: string;
    stderr: string;
    code: number | null;
    signal: string | null;
    output: string;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number | null;
  };
  language: string;
  version: string;
}

export interface RuntimeMetadata {
  memoryUsage: number; // in bytes
  cpuTime: number; // in ms
  isSandboxed: boolean;
}

export interface AiAnalysisResult {
  analysis: string;
  suggestions: string[];
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    bgMain: string;
    bgPanel: string;
    bgHeader: string;
    border: string;
    textMain: string;
    textDim: string;
    accent: string;
    accentHover: string;
    success: string;
    error: string;
  };
  fonts: {
    ui: string;
    code: string;
  };
  radius: string;
  glow?: string;
  isRetro?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: 'google' | 'github' | 'microsoft' | 'email' | 'guest';
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string; // Only for files
  language?: LanguageMode; // Derived from extension
  children?: FileNode[]; // Only for folders
  isOpen?: boolean; // For folder UI state
  parentId?: string | null;
}

// Legacy support for old save format if needed, but we are moving to FileNode[]
export interface SavedCode {
  [languageId: string]: string;
}
