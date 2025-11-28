import React, { useState } from 'react';
import { X, Github, Mail, Globe, User as UserIcon, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { User } from '../types';
import { login, register } from '../services/authService';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Email Auth State
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSocialLogin = async (provider: User['provider']) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await login(provider);
      onLoginSuccess(user);
      onClose();
    } catch (e: any) {
      setError(e.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let user;
      if (isSignUp) {
        if (!name) throw new Error("Name is required for sign up.");
        user = await register(email, password, name);
      } else {
        user = await login('email', email, password);
      }
      onLoginSuccess(user);
      onClose();
    } catch (e: any) {
      setError(e.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const resetEmailState = () => {
    setIsEmailMode(false);
    setError(null);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in" 
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
    >
      <div 
        className="w-full max-w-md flex flex-col border shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: 'var(--theme-bg-main)',
          borderColor: 'var(--theme-border)',
          borderRadius: 'var(--theme-radius)',
          boxShadow: 'var(--theme-glow)'
        }}
      >
        {/* Decorative Header */}
        <div 
          className="h-32 w-full absolute top-0 left-0 z-0 opacity-20"
          style={{ 
            background: 'linear-gradient(to bottom right, var(--theme-accent), transparent)',
          }}
        />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1 rounded-full hover:bg-white/10 transition-colors"
          style={{ color: 'var(--theme-text-dim)' }}
        >
          <X size={20} />
        </button>

        <div className="p-8 z-10 flex flex-col items-center text-center">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold mb-6 shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-bg-main)' }}
          >
            CF
          </div>
          
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--theme-text-main)' }}>
            {isEmailMode ? (isSignUp ? "Create Account" : "Welcome Back") : "Sign In to CodeFlow"}
          </h2>
          <p className="text-sm mb-6 max-w-[80%]" style={{ color: 'var(--theme-text-dim)' }}>
            {isEmailMode 
              ? (isSignUp ? "Join the community and sync your projects." : "Enter your credentials to access your workspace.") 
              : "Sync your code, settings, and themes across all your devices."}
          </p>

          {error && (
            <div 
              className="w-full mb-4 p-3 rounded text-sm flex items-center gap-2 animate-in slide-in-from-top-2"
              style={{ backgroundColor: 'rgba(255, 50, 50, 0.1)', color: 'var(--theme-error)', border: '1px solid var(--theme-error)' }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {!isEmailMode ? (
            /* Social Login & Guest View */
            <div className="w-full space-y-3 animate-in slide-in-from-bottom-4 fade-in">
              <button
                disabled={isLoading}
                onClick={() => handleSocialLogin('guest')}
                className="w-full py-2 px-4 rounded flex items-center justify-center gap-3 font-medium transition-all hover:brightness-110 active:scale-95 text-xs uppercase tracking-wider mb-2 group"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: 'var(--theme-text-dim)',
                  border: '1px dashed var(--theme-border)' 
                }}
              >
                <UserIcon size={14} className="group-hover:text-[var(--theme-accent)] transition-colors" />
                <span>Try as Guest</span>
              </button>

              <button
                disabled={isLoading}
                onClick={() => handleSocialLogin('google')}
                className="w-full py-3 px-4 rounded flex items-center justify-center gap-3 font-medium transition-all hover:brightness-110 active:scale-95"
                style={{ 
                  backgroundColor: 'var(--theme-bg-panel)', 
                  color: 'var(--theme-text-main)',
                  border: '1px solid var(--theme-border)' 
                }}
              >
                <Globe size={18} />
                <span>Continue with Google</span>
              </button>

              <button
                disabled={isLoading}
                onClick={() => handleSocialLogin('github')}
                className="w-full py-3 px-4 rounded flex items-center justify-center gap-3 font-medium transition-all hover:brightness-110 active:scale-95"
                style={{ 
                  backgroundColor: 'var(--theme-bg-panel)', 
                  color: 'var(--theme-text-main)',
                  border: '1px solid var(--theme-border)' 
                }}
              >
                <Github size={18} />
                <span>Continue with GitHub</span>
              </button>

              <button
                disabled={isLoading}
                onClick={() => handleSocialLogin('microsoft')}
                className="w-full py-3 px-4 rounded flex items-center justify-center gap-3 font-medium transition-all hover:brightness-110 active:scale-95"
                style={{ 
                  backgroundColor: 'var(--theme-bg-panel)', 
                  color: 'var(--theme-text-main)',
                  border: '1px solid var(--theme-border)' 
                }}
              >
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-2 h-2 bg-[#f25022]"></div>
                  <div className="w-2 h-2 bg-[#7fba00]"></div>
                  <div className="w-2 h-2 bg-[#00a4ef]"></div>
                  <div className="w-2 h-2 bg-[#ffb900]"></div>
                </div>
                <span>Continue with Microsoft</span>
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t opacity-30" style={{ borderColor: 'var(--theme-border)' }}></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2" style={{ backgroundColor: 'var(--theme-bg-main)', color: 'var(--theme-text-dim)' }}>Or using email</span>
                </div>
              </div>

              <button
                disabled={isLoading}
                onClick={() => setIsEmailMode(true)}
                className="w-full py-3 px-4 rounded flex items-center justify-center gap-3 font-medium transition-all hover:brightness-110 active:scale-95"
                style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-bg-main)' }}
              >
                <Mail size={18} />
                <span>Sign in with Email</span>
              </button>
            </div>
          ) : (
            /* Email Auth View */
            <form onSubmit={handleEmailAuth} className="w-full space-y-3 animate-in slide-in-from-right-4 fade-in">
              {isSignUp && (
                <div className="space-y-1 text-left">
                  <label className="text-xs uppercase font-bold opacity-70 ml-1" style={{ color: 'var(--theme-text-dim)' }}>Full Name</label>
                  <div className="relative">
                    <UserIcon size={16} className="absolute left-3 top-3.5 opacity-50" style={{ color: 'var(--theme-text-main)' }} />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: 'var(--theme-bg-panel)',
                        color: 'var(--theme-text-main)',
                        border: '1px solid var(--theme-border)',
                        borderColor: 'var(--theme-border)',
                      }}
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="text-xs uppercase font-bold opacity-70 ml-1" style={{ color: 'var(--theme-text-dim)' }}>Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3.5 opacity-50" style={{ color: 'var(--theme-text-main)' }} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: 'var(--theme-bg-panel)',
                      color: 'var(--theme-text-main)',
                      border: '1px solid var(--theme-border)',
                      borderColor: 'var(--theme-border)',
                    }}
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs uppercase font-bold opacity-70 ml-1" style={{ color: 'var(--theme-text-dim)' }}>Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3.5 opacity-50" style={{ color: 'var(--theme-text-main)' }} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: 'var(--theme-bg-panel)',
                      color: 'var(--theme-text-main)',
                      border: '1px solid var(--theme-border)',
                      borderColor: 'var(--theme-border)',
                    }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded font-bold transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 mt-4"
                style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-bg-main)' }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={resetEmailState}
                  className="text-xs hover:underline"
                  style={{ color: 'var(--theme-text-dim)' }}
                >
                  Back to options
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError(null);
                  }}
                  className="text-xs font-bold hover:underline"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  {isSignUp ? "Already have an account?" : "Need an account?"}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default AuthModal;
