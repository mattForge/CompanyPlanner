import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark Galaxy Background */}
      <div className="absolute inset-0">
        {/* Animated Galaxy Stars */}
        <div className="fixed inset-0 opacity-75">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-purple-900 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent"></div>
          
          {/* Twinkling Stars */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-ping [animation-duration:3s] opacity-75"></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-ping [animation-duration:2s] opacity-50 delay-1000"></div>
          <div className="absolute top-80 right-32 w-3 h-3 bg-gradient-to-r from-white to-blue-300 rounded-full animate-ping [animation-duration:4s] opacity-90"></div>
          <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-ping [animation-duration:2.5s] opacity-60 delay-500"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-gradient-to-t from-white to-purple-200 rounded-full animate-ping [animation-duration:3.5s] opacity-80"></div>
          
          {/* Floating Nebula */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-purple-800/30 via-pink-800/20 to-blue-800/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-l from-blue-800/40 via-purple-900/30 to-pink-800/40 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-16 w-1 h-1 bg-white/40 rounded-full animate-float"></div>
        <div className="absolute top-64 right-24 w-0.5 h-0.5 bg-gradient-to-r from-white to-blue-200 rounded-full animate-float [animation-delay:1s]"></div>
        <div className="absolute bottom-48 left-48 w-1.5 h-1.5 bg-white/50 rounded-full animate-float [animation-delay:2s]"></div>
        <div className="absolute bottom-24 right-64 w-0.5 h-0.5 bg-gradient-to-t from-white to-purple-200 rounded-full animate-float [animation-delay:3s]"></div>
      </div>

      {/* Glassmorphism Login Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-4xl p-10 shadow-3xl shadow-black/30 hover:shadow-4xl transition-all duration-500 group">
            
            {/* Logo & Title */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                Corporate Planner
              </h1>
              <p className="text-white/70 text-lg font-medium tracking-wide">Access your enterprise dashboard</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="bg-rose-500/20 border border-rose-500/40 text-rose-200 p-4 rounded-2xl backdrop-blur-sm text-sm animate-pulse">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-white/90 font-semibold text-sm uppercase tracking-wide mb-3">Email Address</label>
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl text-white/90 font-semibold placeholder-white/40 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-white/50 transition-all duration-300 text-lg peer"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 -translate-x-2 -skew-y-6 origin-[left_center] group-hover:translate-x-0 group-hover:skew-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.27 7.27c.883.883 2.317.883 3.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-white/90 font-semibold text-sm uppercase tracking-wide mb-3">Password</label>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl text-white/90 font-semibold placeholder-white/40 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-white/50 transition-all duration-300 text-lg peer"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 -translate-x-2 skew-y-6 origin-[left_center] group-hover:translate-x-0 group-hover:skew-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-black py-5 px-8 rounded-3xl shadow-3xl hover:shadow-4xl transform hover:-translate-y-1 transition-all duration-300 text-xl tracking-wide disabled:cursor-not-allowed group relative overflow-hidden"
              >
                {loading ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer"></div>
                    <svg className="w-6 h-6 animate-spin mx-auto" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-opacity duration-300"></div>
                    Enter Galaxy Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-white/20 text-center">
              <p className="text-white/60 text-sm font-medium tracking-wide">
                © 2026 Corporate Planner. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
