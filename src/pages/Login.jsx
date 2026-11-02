import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import { API_URL } from '../services/api';
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Demo login
      if (formData.email === 'demo@tts.com') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', 'demo@tts.com');
        localStorage.setItem('userName', 'Demo User');
        localStorage.setItem('token', 'dummy_token_123');
        localStorage.setItem('isAdmin', 'false');
        window.location.href = '/'; 
        return;
      }

      const res = await axios.post(`${API_URL}/auth/login`, formData);
      
      // Save User Data
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', res.data.email);
      localStorage.setItem('userName', res.data.name);
      localStorage.setItem('token', res.data.token);
      
      // Admin Check
      if (res.data.isAdmin) {
        localStorage.setItem('isAdmin', 'true');
        // Admin Dashboard par bhejo
        window.location.href = '/admin';
      } else {
        localStorage.setItem('isAdmin', 'false');
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f8f6f0] dark:bg-[#0a0a0a] transition-colors duration-300">
      
      <div className="hidden lg:flex w-1/2 relative bg-[#111]">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center h-full px-16 text-white">
          <h2 className="text-5xl font-serif mb-4 leading-tight">Premium<br/>Clothing<br/>for a Better</h2>
          <p className="text-[#eab308] font-serif italic text-4xl mb-8">You.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <div className="w-full max-w-md bg-white dark:bg-[#141414] rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 border border-gray-100 dark:border-gray-800">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex flex-col items-center">
              <h1 className="text-3xl font-serif font-bold tracking-widest text-gray-900 dark:text-white">TTS</h1>
              <p className="text-[10px] tracking-[0.4em] text-[#eab308] mt-1">COLLECTION</p>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-500">Login to your account to continue shopping.</p>
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-lg mb-4 text-center">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="email" required placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#eab308] transition-colors" />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type={showPassword ? "text" : "password"} required placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl py-3.5 pl-12 pr-12 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#eab308] transition-colors" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#eab308] transition-colors">
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#eab308] hover:bg-[#facc15] text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.2)] disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login'} <FiArrowRight />
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800"></div>
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800"></div>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account? <Link to="/signup" className="text-[#eab308] font-bold hover:underline">Create one</Link>
          </p>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-[11px] text-gray-400">
              For Demo Login use: <br/>
              <span className="text-[#eab308] font-bold">demo@tts.com</span> / any password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;