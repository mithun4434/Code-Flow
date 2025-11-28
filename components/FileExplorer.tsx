
import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  FileCode, 
  FilePlus, 
  FolderPlus, 
  ChevronRight, 
  ChevronDown, 
  Trash2,
  File
} from 'lucide-react';
import { FileNode, LanguageMode } from '../types';
import { generateId } from '../services/storageService';

interface FileExplorerProps {
  files: FileNode[];
  activeFileId: string | null;
  onFileSelect: (file: FileNode) => void;
  onFileSystemUpdate: (newFiles: FileNode[]) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ 
  files, 
  activeFileId, 
  onFileSelect, 
  onFileSystemUpdate 
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [isCreating, setIsCreating] = useState<'file' | 'folder' | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const toggleFolder = (folderId: string, nodes: FileNode[]): FileNode[] => {
    return nodes.map(node => {
      if (node.id === folderId) {
        return { ...node, isOpen: !node.isOpen };
      }
      if (node.children) {
        return { ...node, children: toggleFolder(folderId, node.children) };
      }
      return node;
    });
  };

  const handleToggleFolder = (e: React.MouseEvent, folderId: string) => {
    e.stopPropagation();
    setSelectedFolderId(folderId); // Select folder for potential file creation inside
    onFileSystemUpdate(toggleFolder(folderId, files));
  };

  const getFileIcon = (name: string) => {
    if (name.endsWith('.js') || name.endsWith('.ts') || name.endsWith('.tsx')) return <FileCode size={14} className="text-yellow-400" />;
    if (name.endsWith('.py')) return <FileCode size={14} className="text-blue-400" />;
    if (name.endsWith('.css') || name.endsWith('.html')) return <FileCode size={14} className="text-orange-400" />;
    if (name.endsWith('.json')) return <FileCode size={14} className="text-green-400" />;
    return <File size={14} className="opacity-70" />;
  };

  const addNewItem = () => {
    if (!newItemName.trim()) {
      setIsCreating(null);
      return;
    }

    const newItem: FileNode = {
      id: generateId(),
      name: newItemName,
      type: isCreating === 'folder' ? 'folder' : 'file',
      content: isCreating === 'file' ? '' : undefined,
      children: isCreating === 'folder' ? [] : undefined,
      isOpen: true,
      parentId: selectedFolderId
    };

    const addToTree = (nodes: FileNode[]): FileNode[] => {
      // If adding to root
      if (!selectedFolderId) {
        return [...nodes, newItem];
      }
      // If adding to a specific folder
      return nodes.map(node => {
        if (node.id === selectedFolderId && node.type === 'folder') {
          return { ...node, isOpen: true, children: [...(node.children || []), newItem] };
        }
        if (node.children) {
          return { ...node, children: addToTree(node.children) };
        }
        return node;
      });
    };

    onFileSystemUpdate(addToTree(files));
    setIsCreating(null);
    setNewItemName('');
    
    if (newItem.type === 'file') {
      onFileSelect(newItem);
    }
  };

  const deleteItem = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    if (!window.confirm('Delete this item?')) return;

    const deleteFromTree = (nodes: FileNode[]): FileNode[] => {
      return nodes.filter(node => node.id !== itemId).map(node => {
        if (node.children) {
          return { ...node, children: deleteFromTree(node.children) };
        }
        return node;
      });
    };

    onFileSystemUpdate(deleteFromTree(files));
  };

  // Recursive Render
  const renderTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map(node => (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center gap-2 py-1 px-2 cursor-pointer transition-colors hover:bg-white/5 ${activeFileId === node.id ? 'bg-white/10' : ''} ${selectedFolderId === node.id && node.type === 'folder' ? 'border-l-2 border-[var(--theme-accent)]' : 'border-l-2 border-transparent'}`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={(e) => {
            if (node.type === 'folder') {
              handleToggleFolder(e, node.id);
            } else {
              onFileSelect(node);
            }
          }}
        >
          {node.type === 'folder' ? (
            <div className="flex items-center gap-2 text-[var(--theme-accent)] overflow-hidden">
              {node.isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              {node.isOpen ? <FolderOpen size={14} /> : <Folder size={14} />}
              <span className="text-sm truncate" style={{ color: 'var(--theme-text-main)' }}>{node.name}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 overflow-hidden w-full">
              {getFileIcon(node.name)}
              <span className={`text-sm truncate ${activeFileId === node.id ? 'font-bold' : ''}`} style={{ color: activeFileId === node.id ? 'var(--theme-accent)' : 'var(--theme-text-dim)' }}>
                {node.name}
              </span>
            </div>
          )}
          
          {/* Hover Actions */}
          <button 
            onClick={(e) => deleteItem(e, node.id)}
            className="ml-auto opacity-0 group-hover:opacity-100 hover:text-[var(--theme-error)] p-1"
            title="Delete"
          >
            <Trash2 size={12} />
          </button>
        </div>

        {node.type === 'folder' && node.isOpen && node.children && (
          <div>{renderTree(node.children, depth + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="h-full flex flex-col border-r" style={{ borderColor: 'var(--theme-border)' }}>
      {/* Toolbar */}
      <div className="p-2 flex items-center justify-between border-b" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg-header)' }}>
        <span className="text-xs font-bold uppercase tracking-wider opacity-70">Explorer</span>
        <div className="flex gap-1">
          <button 
            onClick={() => { setIsCreating('file'); setSelectedFolderId(null); }} 
            className="p-1 hover:bg-white/10 rounded" 
            title="New File in Root"
          >
            <FilePlus size={14} style={{ color: 'var(--theme-text-dim)' }} />
          </button>
          <button 
            onClick={() => { setIsCreating('folder'); setSelectedFolderId(null); }} 
            className="p-1 hover:bg-white/10 rounded" 
            title="New Folder in Root"
          >
            <FolderPlus size={14} style={{ color: 'var(--theme-text-dim)' }} />
          </button>
        </div>
      </div>

      {/* Creation Input */}
      {isCreating && (
        <div className="p-2 border-b" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg-panel)' }}>
          <div className="flex items-center gap-2 text-xs mb-1 opacity-70">
            {isCreating === 'folder' ? <Folder size={12} /> : <File size={12} />}
            <span>New {isCreating} in {selectedFolderId ? 'Folder' : 'Root'}</span>
          </div>
          <div className="flex gap-1">
            <input
              autoFocus
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addNewItem();
                if (e.key === 'Escape') setIsCreating(null);
              }}
              placeholder={`Name your ${isCreating}...`}
              className="w-full bg-transparent border rounded px-2 py-1 text-sm focus:outline-none focus:border-[var(--theme-accent)]"
              style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-main)' }}
            />
            <button onClick={addNewItem} className="px-2 py-1 text-xs bg-[var(--theme-accent)] text-[var(--theme-bg-main)] rounded font-bold">OK</button>
          </div>
        </div>
      )}

      {/* Tree */}
      <div className="flex-1 overflow-y-auto py-2 group">
        {renderTree(files)}
        {files.length === 0 && (
          <div className="p-4 text-center opacity-50 text-xs italic">
            Empty workspace. <br/> Create a file to start.
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
