import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeartPulse, Chrome, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      } catch (err: any) {
      console.error('Email login error', err);
      setError(err.message || 'Unable to sign in. Check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back to Home */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors mb-4 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-600/20 mb-6">
              <HeartPulse size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500 text-sm">Sign in to access your medical dashboard and book appointments.</p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-teal-400 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-teal-400 focus:outline-none pr-11"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-teal-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-500 transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'LOGIN'}
            </button>

            <div className="text-center text-slate-500">or</div>

            <button
              type="button"
              onClick={login}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:border-teal-600 hover:bg-teal-50/30 transition-all group"
            >
              <Chrome className="text-teal-600 group-hover:scale-110 transition-transform" size={20} />
              <span>Continue with Google</span>
            </button>
          </form>

          <div className="pt-8 border-t border-slate-50 text-center">
            <p className="text-xs text-slate-400 leading-relaxed">
              By continuing, you agree to Vrinda Face Hospital's <br />
              <a href="#" className="text-teal-600 hover:underline">Terms of Service</a> and <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Need help? <a href="mailto:support@vrindaface.com" className="text-teal-600 font-bold hover:underline">Contact Support</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
