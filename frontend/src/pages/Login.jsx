import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email address is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters long';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    
    if (emailErr || passwordErr) return;

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError('Authentication failed. Please try again.');
      setPasswordError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSocialLogin = (provider) => {
    console.log(`${provider} authentication...`);
    // Implement OAuth flows here
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0_black] p-10">
          <div className="success-message text-center">
            <div className="success-icon mx-auto mb-6">✓</div>
            <h3 className="text-2xl font-black uppercase tracking-wide mb-2">Success</h3>
            <p className="text-sm font-bold uppercase tracking-wide text-gray-600">Redirecting...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="login-container w-full max-w-md">
        <div className="login-card bg-white border-4 border-black shadow-[8px_8px_0_black] hover:shadow-[10px_10px_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 p-10 rounded-none">
          
          {/* Header */}
          <div className="login-header text-center mb-8">
            <div className="logo mx-auto mb-4">
              <div className="logo-square w-12 h-12 bg-black border-4 border-black relative mx-auto"></div>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-widest mb-2 text-black">Sign In</h2>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-600">Enter your credentials</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form space-y-6" noValidate>
            
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label block text-xs font-bold uppercase tracking-widest text-black mb-2">
                Email
              </label>
              <div className={`input-wrapper border-2 border-black bg-white focus-within:shadow-[4px_4px_0_black] focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 transition-all ${emailError ? 'border-red-500 animate-shake' : ''}`}>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  className="w-full bg-transparent border-none p-4 text-lg font-medium text-black focus:outline-none"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                />
              </div>
              {emailError && (
                <span className="error-message block mt-2 text-xs font-bold uppercase tracking-widest text-red-500 ml-0.5">
                  {emailError}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label block text-xs font-bold uppercase tracking-widest text-black mb-2">
                Password
              </label>
              <div className={`input-wrapper password-wrapper border-2 border-black bg-white focus-within:shadow-[4px_4px_0_black] focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 transition-all flex ${passwordError ? 'border-red-500 animate-shake' : ''}`}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className="flex-1 bg-transparent border-none p-4 pr-16 text-lg font-medium text-black focus:outline-none"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="password-toggle bg-black text-white border-none px-4 py-2 font-bold text-xs uppercase tracking-wider hover:bg-gray-800 active:scale-[0.98] transition-all"
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {passwordError && (
                <span className="error-message block mt-2 text-xs font-bold uppercase tracking-widest text-red-500 ml-0.5">
                  {passwordError}
                </span>
              )}
              {error && (
                <span className="error-message block mt-2 text-xs font-bold uppercase tracking-widest text-red-500 ml-0.5">
                  {error}
                </span>
              )}
            </div>

            {/* Form Options */}
            <div className="form-options flex justify-between items-center flex-wrap gap-4">
              <div className="checkbox-wrapper flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <label htmlFor="remember" className="checkbox-label flex items-center gap-2 cursor-pointer select-none text-sm font-bold text-black">
                  <div className={`checkbox-box w-4 h-4 border-2 border-black bg-white relative transition-all ${rememberMe ? 'bg-black' : ''}`}>
                    {rememberMe && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-black">✓</span>
                    )}
                  </div>
                  <span>Remember me</span>
                </label>
              </div>
              <a href="#" className="forgot-link text-xs font-bold uppercase tracking-wider text-black border-b-2 border-transparent hover:border-black transition-all">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`login-btn w-full bg-black text-white border-2 border-black p-4 font-bold uppercase tracking-widest text-sm relative overflow-hidden transition-all hover:bg-gray-800 hover:shadow-[4px_4px_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0_black] active:translate-x-0 active:translate-y-0 ${loading ? 'loading' : ''}`}
            >
              <span className={`btn-text relative z-10 transition-opacity ${loading ? 'opacity-0' : 'opacity-100'}`}>
                SIGN IN
              </span>
              {loading && (
                <div className="btn-loader absolute inset-0 flex items-center justify-center opacity-100">
                  <div className="loader-bar w-1 h-4 bg-white animate-[pulse_1s_ease-in-out_infinite]"></div>
                  <div className="loader-bar w-1 h-4 bg-white animate-[pulse_1s_ease-in-out_infinite] animation-delay-200"></div>
                  <div className="loader-bar w-1 h-4 bg-white animate-[pulse_1s_ease-in-out_infinite] animation-delay-400"></div>
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider relative my-6">
            <span className="relative bg-white px-4 text-xs font-bold uppercase tracking-widest text-black">OR</span>
            <div className="absolute inset-0 h-px bg-black top-1/2"></div>
          </div>

          {/* Social Login */}
          <div className="social-login flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="social-btn flex-1 bg-white text-black border-2 border-black p-3 font-bold uppercase text-xs tracking-wider hover:bg-black hover:text-white hover:shadow-[2px_2px_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0_black] transition-all"
            >
              GOOGLE
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('GitHub')}
              className="social-btn flex-1 bg-white text-black border-2 border-black p-3 font-bold uppercase text-xs tracking-wider hover:bg-black hover:text-white hover:shadow-[2px_2px_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0_black] transition-all"
            >
              GITHUB
            </button>
          </div>

          {/* Signup Link */}
          <div className="signup-link text-center text-sm font-bold text-gray-600">
            <span>No account? </span>
            <a href="#" className="text-black uppercase tracking-wider border-b-2 border-transparent hover:border-black font-black transition-all">Create one</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        @keyframes loaderPulse {
          0%, 80%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          40% { transform: scaleY(1); opacity: 1; }
        }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </div>
  );
};

export default Login;
