import React from 'react';
import { Terminal as TerminalIcon, AlertCircle, CheckCircle, Play, Sparkles } from 'lucide-react';
import { ExecutionResult } from '../types';

interface TerminalProps {
  output: ExecutionResult | null;
  isRunning: boolean;
  onClear: () => void;
  onAskAI: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ output, isRunning, onClear, onAskAI }) => {
  return (
    <div 
      className="flex flex-col h-full border-t md:border-t-0 md:border-l transition-colors duration-500"
      style={{
        backgroundColor: 'var(--theme-bg-panel)',
        borderColor: 'var(--theme-border)',
        borderTopRightRadius: 'var(--theme-radius)',
        borderBottomRightRadius: 'var(--theme-radius)',
      }}
    >
      {/* Terminal Header */}
      <div 
        className="flex items-center justify-between px-4 py-2 border-b transition-colors duration-500"
        style={{
          backgroundColor: 'var(--theme-bg-header)',
          borderColor: 'var(--theme-border)',
          borderTopRightRadius: 'var(--theme-radius)',
        }}
      >
        <div className="flex items-center gap-2" style={{ color: 'var(--theme-text-dim)' }}>
          <TerminalIcon size={16} />
          <span className="text-sm font-bold tracking-wider">CONSOLE</span>
        </div>
        <div className="flex gap-2">
          {output && (output.run.code !== 0 || output.run.stderr) && (
            <button 
              onClick={onAskAI}
              className="px-3 py-1 text-xs font-bold flex items-center gap-1 transition-all hover:brightness-125"
              style={{
                color: 'var(--theme-text-main)',
                backgroundColor: 'var(--theme-bg-main)',
                border: '1px solid var(--theme-accent)',
                borderRadius: 'var(--theme-radius)',
              }}
            >
              <Sparkles size={12} /> Explain
            </button>
          )}
          <button
            onClick={onClear}
            className="px-3 py-1 text-xs font-medium transition-colors hover:opacity-100 opacity-70"
            style={{ color: 'var(--theme-text-dim)' }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        className="flex-1 p-4 overflow-auto text-sm"
        style={{ fontFamily: 'var(--theme-font-code)' }}
      >
        {isRunning ? (
          <div className="flex items-center gap-2 animate-pulse" style={{ color: 'var(--theme-accent)' }}>
            <Play size={14} className="animate-spin" />
            <span>Initializing Secure Sandbox...</span>
          </div>
        ) : !output ? (
          <div className="italic" style={{ color: 'var(--theme-text-dim)' }}>
            System ready. Waiting for compilation command...
          </div>
        ) : (
          <div className="space-y-4">
            {/* Compilation Stage */}
            {output.compile && output.compile.code !== 0 && (
               <div 
                 className="p-3 border"
                 style={{
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    borderColor: 'var(--theme-error)',
                    borderRadius: 'var(--theme-radius)',
                 }}
               >
                  <div className="font-bold mb-1 text-xs uppercase" style={{ color: 'var(--theme-error)' }}>Compilation Error</div>
                  <pre className="whitespace-pre-wrap break-words" style={{ color: 'var(--theme-text-main)' }}>{output.compile.stderr || output.compile.stdout}</pre>
               </div>
            )}

            {/* Run Stage - STDOUT */}
            {output.run.stdout && (
              <div>
                <div className="text-[10px] uppercase tracking-wider mb-1 opacity-50" style={{ color: 'var(--theme-success)' }}>STDOUT</div>
                <pre className="whitespace-pre-wrap break-words" style={{ color: 'var(--theme-text-main)' }}>{output.run.stdout}</pre>
              </div>
            )}

            {/* Run Stage - STDERR */}
            {output.run.stderr && (
              <div className="mt-2">
                 <div className="text-[10px] uppercase tracking-wider mb-1 opacity-50" style={{ color: 'var(--theme-error)' }}>STDERR</div>
                 <pre className="whitespace-pre-wrap break-words" style={{ color: 'var(--theme-error)' }}>{output.run.stderr}</pre>
              </div>
            )}

            {/* Metadata Footer */}
            <div 
              className="pt-4 mt-4 border-t flex flex-wrap gap-4 text-xs opacity-60"
              style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-dim)' }}
            >
              <div className="flex items-center gap-1">
                {output.run.code === 0 ? (
                  <CheckCircle size={12} style={{ color: 'var(--theme-success)' }} />
                ) : (
                  <AlertCircle size={12} style={{ color: 'var(--theme-error)' }} />
                )}
                <span>Exit Code: {output.run.code}</span>
              </div>
              <div>
                Signal: {output.run.signal || 'None'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;