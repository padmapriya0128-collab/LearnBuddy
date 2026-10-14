import React, { useState } from 'react';
import { UserProfile } from '../types/index.ts';
import { Eye, EyeOff, Lock, Mail, User, Sparkles, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [name, setName] = useState<string>('Priya');
  const [emailOrUser, setEmailOrUser] = useState<string>('priya.student@school.edu');
  const [password, setPassword] = useState<string>('learn123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (isRegistering && !name.trim()) {
      setErrorMessage('Please enter your full name or nickname.');
      return;
    }
    if (!emailOrUser.trim()) {
      setErrorMessage('Please enter your email or student username.');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);

    // Secure local session storage
    setTimeout(() => {
      setIsLoading(false);
      const studentName = isRegistering ? name.trim() : emailOrUser.split('@')[0] || 'Student';
      const userProfile: UserProfile = {
        id: 'std_' + Math.random().toString(36).substring(2, 9),
        name: studentName.charAt(0).toUpperCase() + studentName.slice(1),
        email: emailOrUser.includes('@') ? emailOrUser : `${emailOrUser}@learnbuddy.app`,
      };

      // Persist in localStorage safely
      try {
        localStorage.setItem('learnbuddy_student_session', JSON.stringify(userProfile));
      } catch (err) {
        console.warn('Storage unavailable:', err);
      }

      onLoginSuccess(userProfile);
    }, 400);
  };

  const handleDemoFill = (demoName: string, demoEmail: string) => {
    setName(demoName);
    setEmailOrUser(demoEmail);
    setPassword('learn123');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-amber-50/60 via-amber-100/30 to-sky-50/50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-amber-500/5 border border-amber-200/90 p-6 sm:p-8 relative overflow-hidden">
        {/* Soft decorative background circles */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-sky-200/50 rounded-full blur-2xl pointer-events-none" />

        {/* Brand Logo & Heading */}
        <div className="text-center mb-6 relative">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-300 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/25 mb-3 text-white">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Welcome to <span className="text-amber-600">LearnBuddy</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Your personalized AI school teacher for Class 1 to Class 12
          </p>
        </div>

        {/* Tab Toggle: Login vs Register */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setIsRegistering(false);
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              !isRegistering
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegistering(true);
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              isRegistering
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Error Banner */}
        {errorMessage && (
          <div className="mb-4 bg-rose-50 border border-rose-200 rounded-2xl p-3 text-xs text-rose-700 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field (if registering) */}
          {isRegistering && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Student Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya or Rahul"
                  className="w-full bg-slate-50/70 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-hidden transition-all"
                />
              </div>
            </div>
          )}

          {/* Email / Username Field */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Email or Student Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={emailOrUser}
                onChange={(e) => setEmailOrUser(e.target.value)}
                placeholder="student@school.edu or username"
                className="w-full bg-slate-50/70 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-hidden transition-all"
              />
            </div>
          </div>

          {/* Password Field with Toggle */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50/70 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-2xl pl-10 pr-10 py-2.5 text-sm text-slate-800 outline-hidden transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-98 text-white rounded-2xl py-3 font-bold text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isRegistering ? 'Create Student Account' : 'Sign In to Learn'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Logins for Testing */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <p className="text-[11px] text-slate-400 text-center font-medium mb-2">
            Quick demo student profiles:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              onClick={() => handleDemoFill('Priya (Class 7)', 'priya.class7@learnbuddy.app')}
              className="text-[11px] font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-200 transition-colors"
            >
              👩‍🎓 Priya (Class 7)
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('Karthik (Class 10)', 'karthik.class10@learnbuddy.app')}
              className="text-[11px] font-semibold bg-sky-50 hover:bg-sky-100 text-sky-800 px-3 py-1 rounded-full border border-sky-200 transition-colors"
            >
              👨‍🎓 Karthik (Class 10)
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('Ananya (Class 4)', 'ananya.class4@learnbuddy.app')}
              className="text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 transition-colors"
            >
              🎒 Ananya (Class 4)
            </button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-4 text-center flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Kid-safe & protected educational environment</span>
        </div>
      </div>
    </div>
  );
};
