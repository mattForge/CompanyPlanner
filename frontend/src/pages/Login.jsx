import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email address is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = () => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters long';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailErr = validateEmail();
    const passwordErr = validatePassword();
    
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    
    if (emailErr || passwordErr) return;

    setLoading(true);
    try {
      await login(email, password);
      setShowSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2500);
    } catch (error) {
      setPasswordError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-5 font-['Arial']">
        <div className="w-full max-w-sm bg-white border-[3px] border-black shadow-[8px_8px_0_#000] p-[40px]">
          <div className="text-center">
            <div className="success-icon w-[48px] h-[48px] bg-black border-[3px] border-black flex items-center justify-center text-[20px] font-black text-white mx-auto mb-[16px] animate-[successPop_0.5s_ease-out]">✓</div>
            <h3 className="text-[1.25rem] font-black uppercase mb-[4px] text-black">Success</h3>
            <p className="text-xs font-bold uppercase tracking-[0.5px] text-[#666]">Redirecting...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-[20px] font-['Arial'] leading-[1.4]">
      <div className="w-full max-w-[400px]">
        <div className="login-card bg-white border-[3px] border-black rounded-none p-[40px] shadow-[8px_8px_0_#000] hover:shadow-[10px_10px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
          
          {/* Header - EXACT MATCH */}
          <div className="login-header text-center mb-[32px]">
            <div className="logo mb-[16px] flex justify-center">
              <div className="logo-square w-[48px] h-[48px] bg-black border-[3px] border-black relative"></div>
            </div>
            <h2 className="text-[1.75rem] font-black uppercase tracking-[1px] mb-[8px] text-black">Sign In</h2>
            <p className="text-[14px] font-bold uppercase tracking-[1px] text-[#666666]">Enter your credentials</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-[24px]">
            
            {/* Email */}
            <div className="form-group relative">
              <label htmlFor="email" className="form-label block text-xs font-bold uppercase tracking-[1px] text-black mb-[8px]">
                Email
              </label>
              <div className={`input-wrapper border-2 border-black bg-white ${emailError ? 'border-[#dc3545]' : 'hover:shadow-[4px_4px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]'} transition-all`}>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className="w-full bg-transparent border-none p-[12px_16px] text-black text-[16px] font-[500] outline-none placeholder-[#999]"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                />
              </div>
              {emailError && (
                <span className="error-message mt-[6px] ml-[2px] block text-[11px] font-bold uppercase tracking-[0.5px] text-[#dc3545] opacity-0 translate-y-[-8px] transition-all duration-200">
                  {emailError}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group relative">
              <label htmlFor="password" className="form-label block text-xs font-bold uppercase tracking-[1px] text-black mb-[8px]">
                Password
              </label>
              <div className={`input-wrapper password-wrapper border-2 border-black bg-white ${passwordError ? 'border-[#dc3545]' : 'hover:shadow-[4px_4px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]'} flex transition-all`}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  className="flex-1 bg-transparent border-none p-[12px_16px] pr-[60px] text-black text-[16px] font-[500] outline-none placeholder-[#999]"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle absolute right-0 top-0 bottom-0 bg-black text-white border-none px-[12px] font-bold text-[10px] uppercase tracking-[0.5px] hover:bg-[#333] active:scale-[0.98] transition-all cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span>{showPassword ? 'HIDE' : 'SHOW'}</span>
                </button>
              </div>
              {passwordError && (
                <span className="error-message mt-[6px] ml-[2px] block text-[11px] font-bold uppercase tracking-[0.5px] text-[#dc3545] opacity-0 translate-y-[-8px] transition-all duration-200">
                  {passwordError}
                </span>
              )}
            </div>

            {/* Form Options */}
            <div className="form-options flex justify-between items-center mb-[28px] flex-wrap gap-[16px]">
              <div className="checkbox-wrapper flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="hidden"
                />
                <label htmlFor="remember" className="flex items-center gap-[8px] cursor-pointer select-none text-[14px] font-bold text-black">
                  <div className={`checkbox-box w-4 h-4 border-2 border-black bg-white relative transition-all ${rememberMe ? 'bg-black' : ''}`}>
                    {rememberMe && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-black opacity-100">✓</span>
                    )}
                  </div>
                  <span>Remember me</span>
                </label>
              </div>
              <a href="#" className="forgot-link text-[12px] font-bold uppercase tracking-[0.5px] text-black border-b-2 border-transparent hover:border-black transition-all no-underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`login-btn w-full bg-black text-white border-2 border-black p-[16px] font-bold uppercase tracking-[1px] text-[14px] relative overflow-hidden mb-[24px] cursor-pointer transition-all hover:bg-[#333333] hover:shadow-[4px_4px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0_#000] active:translate-x-0 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 ${loading ? 'loading' : ''}`}
            >
              <span className={`btn-text absolute inset-0 flex items-center justify-center z-10 transition-opacity ${loading ? 'opacity-0' : 'opacity-100'}`}>
                SIGN IN
              </span>
              {loading && (
                <div className="btn-loader absolute inset-0 flex items-center justify-center opacity-100">
                  <div className="loader-bar w-[3px] h-[16px] bg-white animate-[loaderPulse_1s_ease-in-out_infinite]"></div>
                  <div className="loader-bar w-[3px] h-[16px] bg-white animate-[loaderPulse_1s_ease-in-out_infinite] [animation-delay:0.2s]"></div>
                  <div className="loader-bar w-[3px] h-[16px] bg-white animate-[loaderPulse_1s_ease-in-out_infinite] [animation-delay:0.4s]"></div>
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider relative mx-0 my-[24px] text-center">
            <div className="absolute inset-x-0 top-1/2 h-[2px] bg-black transform -translate-y-1/2"></div>
            <span className="relative bg-white px-[16px] text-[12px] font-bold uppercase tracking-[1px] text-black z-10">OR</span>
          </div>

          {/* Social Buttons */}
          <div className="social-login flex gap-[12px] mb-[24px]">
            <button
              type="button"
              className="social-btn flex-1 bg-white text-black border-2 border-black p-[12px] font-bold uppercase text-[12px] tracking-[0.5px] hover:bg-black hover:text-white hover:shadow-[2px_2px_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-[1px_1px_0_#000] transition-all cursor-pointer"
              onClick={() => console.log('Google login')}
            >
              GOOGLE
            </button>
            <button
              type="button"
              className="social-btn flex-1 bg-white text-black border-2 border-black p-[12px] font-bold uppercase text-[12px] tracking-[0.5px] hover:bg-black hover:text-white hover:shadow-[2px_2px_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-[1px_1px_0_#000] transition-all cursor-pointer"
              onClick={() => console.log('GitHub login')}
            >
              GITHUB
            </button>
          </div>

          {/* Signup Link */}
          <div className="signup-link text-center text-[14px] font-bold text-[#666666]">
            <span>No account? </span>
            <a href="#" className="text-black uppercase tracking-[0.5px] border-b-2 border-transparent hover:border-black font-bold transition-all">Create one</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
