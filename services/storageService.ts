
import { LanguageMode, FileNode } from '../types';
import { LANGUAGES } from '../constants';

const STORAGE_PREFIX = 'codeflow_fs_';
const USER_DB_KEY = 'codeflow_users_db';

// Get the storage key for a specific user's file system
const getUserFsKey = (userId: string) => `${STORAGE_PREFIX}${userId}`;

// Generate a random ID
export const generateId = () => Math.random().toString(36).substr(2, 9);

const createDefaultFileSystem = (): FileNode[] => [
  {
    id: 'root_folder_1',
    name: 'My Projects',
    type: 'folder',
    isOpen: true,
    parentId: null,
    children: [
      {
        id: 'file_welcome_py',
        name: 'main.py',
        type: 'file',
        language: LanguageMode.PYTHON,
        content: LANGUAGES[LanguageMode.PYTHON].boilerplate,
        parentId: 'root_folder_1'
      },
      {
        id: 'file_utils_js',
        name: 'utils.js',
        type: 'file',
        language: LanguageMode.JAVASCRIPT,
        content: `// Utility functions
console.log("Utils loaded");
`,
        parentId: 'root_folder_1'
      }
    ]
  },
  {
    id: 'file_scratch_txt',
    name: 'scratchpad.txt',
    type: 'file',
    language: LanguageMode.BASH, // Treat txt as generic/bash for highlighting
    content: 'Draft your ideas here...',
    parentId: null
  }
];

export const saveFileSystem = (userId: string, fileSystem: FileNode[]): void => {
  try {
    const key = getUserFsKey(userId);
    localStorage.setItem(key, JSON.stringify(fileSystem));
  } catch (e) {
    console.error("Failed to save file system", e);
  }
};

export const loadFileSystem = (userId: string): FileNode[] => {
  try {
    const key = getUserFsKey(userId);
    const existingDataStr = localStorage.getItem(key);
    
    if (!existingDataStr) {
      return createDefaultFileSystem();
    }

    return JSON.parse(existingDataStr);
  } catch (e) {
    console.error("Failed to load file system", e);
    return createDefaultFileSystem();
  }
};

// Recursively find a node by ID and update it
export const updateNodeContent = (nodes: FileNode[], nodeId: string, newContent: string): FileNode[] => {
  return nodes.map(node => {
    if (node.id === nodeId && node.type === 'file') {
      return { ...node, content: newContent };
    }
    if (node.children) {
      return { ...node, children: updateNodeContent(node.children, nodeId, newContent) };
    }
    return node;
  });
};

// Helper to find a node by ID
export const findNodeById = (nodes: FileNode[], nodeId: string): FileNode | null => {
  for (const node of nodes) {
    if (node.id === nodeId) return node;
    if (node.children) {
      const found = findNodeById(node.children, nodeId);
      if (found) return found;
    }
  }
  return null;
};
