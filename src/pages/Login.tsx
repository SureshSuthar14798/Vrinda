import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeartPulse, Chrome, Mail, ChevronLeft } from 'lucide-react';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

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
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors mb-8 group"
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

          <div className="space-y-4">
            <button
              onClick={login}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:border-teal-600 hover:bg-teal-50/30 transition-all group"
            >
              <Chrome className="text-teal-600 group-hover:scale-110 transition-transform" size={20} />
              <span>Continue with Google</span>
            </button>

            <button
              onClick={login}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 border-2 border-slate-900 rounded-2xl font-bold text-white hover:bg-slate-800 transition-all group"
            >
              <Mail className="text-teal-400 group-hover:scale-110 transition-transform" size={20} />
              <span>Sign in with Gmail</span>
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
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
