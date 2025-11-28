import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';

// Core dependencies must be loaded first
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';

// Language definitions
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (newCode: string) => void;
  disabled?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, onChange, disabled }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const getPrismLang = (lang: string) => {
    const map: Record<string, string> = {
      javascript: 'javascript',
      typescript: 'typescript',
      python: 'python',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      go: 'go',
      rust: 'rust',
      csharp: 'csharp',
      ruby: 'ruby',
      php: 'php',
      swift: 'swift',
      bash: 'bash',
      sqlite3: 'sql',
    };
    return map[lang] || 'javascript';
  };

  useEffect(() => {
    if (preRef.current) {
      // We highlight the code element inside the pre if possible, or the pre itself.
      // Since we are structuring it as pre > code below, we target the code element if we can reference it, 
      // but Prism.highlightElement works on the element passed. 
      // The standard is pre > code.
      // To keep it simple and aligned, let's just highlight the pre as before, but ensure alignment.
      // Actually, standard prism usage recommends highlighting the code element.
      // But for this overlay editor technique, highlighting the PRE directly is often easier to control styles.
      Prism.highlightElement(preRef.current);
    }
  }, [code, language]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const val = e.currentTarget.value;
      const newVal = val.substring(0, start) + '    ' + val.substring(end);
      onChange(newVal);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div 
      className="editor-container w-full h-full overflow-hidden border relative"
      style={{
        backgroundColor: 'var(--theme-bg-panel)',
        borderColor: 'var(--theme-border)',
        borderRadius: 'var(--theme-radius)',
      }}
    >
        {/* Syntax Highlight Layer */}
        {/* Note: We apply 'editor-layer' to both PRE and CODE to ensure they inherit the forced styles if nested, 
            but here we just apply to PRE to match TextArea perfectly. */}
        <pre
          ref={preRef}
          className={`editor-layer editor-highlight language-${getPrismLang(language)}`}
          aria-hidden="true"
          style={{ pointerEvents: 'none' }} 
        >
          {code + (code.endsWith('\n') ? ' ' : '')}
        </pre>

        {/* Input Layer */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleInput}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="editor-layer editor-textarea focus:outline-none"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
    </div>
  );
};

export default CodeEditor;