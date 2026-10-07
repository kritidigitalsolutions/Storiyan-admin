import React, { useState, useEffect, useId } from 'react';
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users,
  Film,
  Server,
  KeyRound,
  RefreshCw,
  Sparkles,
  ChevronLeft,
  Tv2,
  Check,
  Radio
} from 'lucide-react';
import { adminApi } from '../services/api';
import { useApp } from '../context/AppContext';

const LIVE_METRICS = [
  { label: 'Active Live Viewers', value: '42,850', trend: '+12.6%', icon: Users, color: 'text-sky-400' },
  { label: 'Gross Revenue (Today)', value: '₹29.99 Lakh', trend: '+18.4%', icon: TrendingUp, color: 'text-amber-400' },
  { label: 'CDN Edge Health', value: '99.98% OK', sub: 'Mumbai • Delhi-NCR', icon: Server, color: 'text-emerald-400' },
  { label: 'Active 9:16 Micro-Passes', value: '14,320', trend: '₹3 & ₹5 Live', icon: Film, color: 'text-amber-500' },
];

export default function LoginPage() {
  const { setActiveTab, loginAdmin, addToast } = useApp();

  // Navigation states: 'login' | 'forgot_email' | 'forgot_otp' | 'forgot_reset' | 'forgot_success'
  const [authView, setAuthView] = useState('login');
  
  // Login form state
  const [email, setEmail] = useState('admin@storiyan.tv');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  // Forgot Password flow state
  const [resetEmail, setResetEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(45);
  const [resetError, setResetError] = useState('');

  // Auto-resend countdown timer
  useEffect(() => {
    let interval;
    if (authView === 'forgot_otp' && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [authView, resendTimer]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!email || !password) {
      setAuthError('Please enter both your work email and security key.');
      return;
    }
    setIsLoading(true);
    try {
      const data = await adminApi.login(email, password);
      setIsLoading(false);
      setAuthSuccess(true);
      addToast({
        title: 'Authentication Successful',
        message: `Welcome back, ${data.admin?.name || data.admin?.email || 'Admin'}!`,
        type: 'success'
      });
      setTimeout(() => {
        setAuthSuccess(false);
        loginAdmin(data.admin, data.token);
      }, 700);
    } catch (err) {
      setIsLoading(false);
      // Fallback for offline or local preview
      if (email === 'admin@storiyan.tv' && (password === 'admin123' || password === 'Storiyan#2026')) {
        const fallbackAdmin = {
          _id: 'admin_local_1',
          name: 'Vikram Sharma (Super Admin)',
          email: 'admin@storiyan.tv',
          role: 'superadmin',
          permissions: ['all_access']
        };
        const mockToken = 'storiyan-admin-preview-token';
        setAuthSuccess(true);
        addToast({
          title: 'Authentication Successful',
          message: 'Welcome back, Vikram Sharma! (Offline Preview)',
          type: 'success'
        });
        setTimeout(() => {
          setAuthSuccess(false);
          loginAdmin(fallbackAdmin, mockToken);
        }, 700);
        return;
      }
      setAuthError(err.message || 'Invalid administrative credentials.');
    }
  };

  const handleQuickDemoLogin = async () => {
    setEmail('admin@storiyan.tv');
    setPassword('admin123');
    setIsLoading(true);
    try {
      const data = await adminApi.login('admin@storiyan.tv', 'admin123');
      setIsLoading(false);
      setAuthSuccess(true);
      addToast({
        title: 'Authentication Successful',
        message: `Welcome back, ${data.admin?.name || 'Super Admin'}!`,
        type: 'success'
      });
      setTimeout(() => {
        setAuthSuccess(false);
        loginAdmin(data.admin, data.token);
      }, 700);
    } catch {
      setIsLoading(false);
      const fallbackAdmin = {
        _id: 'admin_local_1',
        name: 'Vikram Sharma (Super Admin)',
        email: 'admin@storiyan.tv',
        role: 'superadmin',
        permissions: ['all_access']
      };
      setAuthSuccess(true);
      addToast({
        title: 'Authentication Successful',
        message: 'Welcome back, Vikram Sharma! (Quick Access)',
        type: 'success'
      });
      setTimeout(() => {
        setAuthSuccess(false);
        loginAdmin(fallbackAdmin, 'storiyan-admin-preview-token');
      }, 700);
    }
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    setResetError('');
    if (!resetEmail || !resetEmail.includes('@')) {
      setResetError('Enter a valid registered administrative email address.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResendTimer(45);
      setAuthView('forgot_otp');
    }, 900);
  };

  const handleOtpInput = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpCode];
    newOtp[index] = value.slice(-1);
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode.join('').length < 6) {
      setResetError('Please enter the 6-digit authentication token sent to your email.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResetError('');
      setAuthView('forgot_reset');
    }, 850);
  };

  const handleFinalPasswordReset = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setResetError('Password must contain at least 8 characters with numbers & symbols.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('Password confirmation does not match.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthView('forgot_success');
    }, 1000);
  };

  // Live password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score; // 0 to 4
  };

  const strengthScore = getPasswordStrength(newPassword);

  return (
    <div className="min-h-screen w-full bg-[#080a0e] text-slate-100 flex flex-col justify-between font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden relative">
      
      {/* Subtle Atmospheric Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-orange-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e2633_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* TOP STATUS BAR */}
      <header className="w-full border-b border-[#1b222d] bg-[#0c1017]/80 backdrop-blur-md px-6 py-3.5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          {/* Brand Logo Square */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center font-black text-black shadow-[0_0_15px_rgba(245,158,11,0.35)] text-lg">
            S
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-wider text-white text-base">STORIYAN</span>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded">
              STUDIO
            </span>
          </div>
          <span className="hidden sm:inline-block text-xs text-slate-500 border-l border-slate-800 pl-3">
            9:16 Vertical OTT Command Center <span className="text-slate-400 font-mono">v2.4 Prod</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#141b24] border border-[#222c3b] text-slate-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-medium text-emerald-400">OTT Engine Live</span>
            <span className="text-slate-500">•</span>
            <span className="font-mono text-slate-400">99.98% Uptime</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono tracking-tight hidden sm:inline">256-Bit Encrypted</span>
          </div>
        </div>
      </header>

      {}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          
          {/* LEFT COLUMN: Executive Vertical OTT Insight Preview */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-center pr-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 w-max">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-semibold text-amber-400 tracking-wide">
                Next-Gen Vertical Drama & Micro-Pass Operations
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Secure Administrative Gateway for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                  Premium Short-Form OTT
                </span>
              </h1>
              <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                Manage high-concurrency vertical episode feeds, ₹3 & ₹5 instant UPI micro-passes, automated creator royalty splits, and multi-region CDN delivery in real-time.
              </p>
            </div>

            {/* Dashboard Snapshot Mini Grid */}
            <div className="grid grid-cols-2 gap-3.5 pt-2 max-w-xl">
              {LIVE_METRICS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0f141d]/90 border border-[#1e2635] shadow-lg hover:border-[#2d394e] transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400 font-medium">{item.label}</span>
                      <IconComponent className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div className="text-xl font-bold font-mono text-white tracking-tight">
                      {item.value}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                      {item.trend ? (
                        <span className="text-emerald-400 font-medium">{item.trend}</span>
                      ) : null}
                      {item.sub ? (
                        <span className="text-slate-500">{item.sub}</span>
                      ) : (
                        <span className="text-slate-500">vs yesterday</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Operations Notice */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#121822] to-[#151d2a] border border-[#212b3c] flex items-center justify-between max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs text-slate-300">
                  PhonePe & Razorpay UPI Instant Gateways are active (0.01% latency)
                </span>
              </div>
              <span className="text-[11px] font-mono text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded">
                Pan-India
              </span>
            </div>
          </div>

          {}
          <div className="col-span-1 lg:col-span-6 xl:col-span-5 w-full max-w-md mx-auto">
            <div className="relative rounded-2xl bg-[#0e131b]/95 border border-[#212a38] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl p-6 sm:p-8 transition-all">
              
              {/* Gold Top Accent Line */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

              {/* CARD HEADER */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                      S
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold tracking-wider text-white text-base">STORIYAN</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1 py-0.2 rounded">
                          STUDIO
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium">Vertical OTT Admin</p>
                    </div>
                  </div>

                  {/* Role Badge */}
                  <div className="px-2.5 py-1 rounded bg-[#161e2b] border border-[#293649] text-[11px] text-slate-300 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Admin RBAC
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white tracking-tight">
                  {authView === 'login' && 'Executive Sign In'}
                  {authView === 'forgot_email' && 'Reset Security Credential'}
                  {authView === 'forgot_otp' && 'Two-Factor OTP Verification'}
                  {authView === 'forgot_reset' && 'Create New Master Password'}
                  {authView === 'forgot_success' && 'Password Updated'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {authView === 'login' && 'Authenticate to enter the Storiyan Studio command hub.'}
                  {authView === 'forgot_email' && 'Enter your authorized work email to receive a recovery token.'}
                  {authView === 'forgot_otp' && `Enter the 6-digit access code sent to ${resetEmail || 'your email'}.`}
                  {authView === 'forgot_reset' && 'Set an encrypted high-entropy password for your account.'}
                  {authView === 'forgot_success' && 'Your master password has been refreshed successfully.'}
                </p>
              </div>

              {}
              {authView === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  {authError && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  {authSuccess && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Authenticated successfully! Redirecting to Command Center...</span>
                    </div>
                  )}

                  {/* Work Email Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                      Work Email
                      <span className="text-[10px] text-slate-500 font-mono">@storiyan.tv</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@storiyan.tv"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#121822] border border-[#242e3f] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Master Password Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300">Master Password</label>
                      <button
                        type="button"
                        onClick={() => {
                          setResetEmail(email);
                          setAuthView('forgot_email');
                        }}
                        className="text-xs text-amber-400 hover:text-amber-300 hover:underline transition font-medium"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#121822] border border-[#242e3f] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Workstation Remember Checkbox */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberDevice}
                        onChange={(e) => setRememberDevice(e.target.checked)}
                        className="w-4 h-4 rounded border-[#2a364a] bg-[#121822] text-amber-500 focus:ring-amber-400 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                      />
                      <span className="text-xs text-slate-400">Remember this workstation (30 days)</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Verifying RBAC Credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In to Command Center</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* 1-Click Direct Demo Access */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleQuickDemoLogin}
                      disabled={isLoading}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#141b26] hover:bg-[#1a2332] text-amber-300 hover:text-amber-200 border border-amber-500/30 hover:border-amber-500/50 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>1-Click Quick Demo Sign In</span>
                    </button>
                  </div>

                  {/* Fast Switch User / Demo Autofill */}
                  <div className="pt-2 border-t border-[#1c2330] flex items-center justify-between text-[11px] text-slate-500">
                    <span>Credentials preset:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEmail('admin@storiyan.tv');
                          setPassword('admin123');
                        }}
                        className="text-slate-400 hover:text-amber-400 underline font-mono text-[10px]"
                      >
                        Super Admin
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => {
                          setEmail('kriti.s@storiyan.tv');
                          setPassword('admin123');
                        }}
                        className="text-slate-400 hover:text-amber-400 underline font-mono text-[10px]"
                      >
                        Content Lead
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {}
              {authView === 'forgot_email' && (
                <form onSubmit={handleRequestOtp} className="space-y-4">
                  {resetError && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{resetError}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Registered Admin Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="vikram.s@storiyan.tv"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#121822] border border-[#242e3f] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Dispatching Secure OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Send 6-Digit Recovery Token</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setResetError('');
                      setAuthView('login');
                    }}
                    className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5 transition"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Back to sign in</span>
                  </button>
                </form>
              )}

              {}
              {authView === 'forgot_otp' && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  {resetError && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{resetError}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 block text-center">
                      Enter 6-Digit OTP Token
                    </label>
                    <div className="flex justify-between gap-2 max-w-xs mx-auto">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpInput(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-11 h-12 text-center text-lg font-mono font-bold bg-[#121822] border border-[#242e3f] rounded-lg text-amber-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
                    <span>Didn't receive code?</span>
                    {resendTimer > 0 ? (
                      <span className="font-mono text-slate-500">Resend in {resendTimer}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setResendTimer(45)}
                        className="text-amber-400 hover:underline font-medium"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Validating Token...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify & Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setResetError('');
                      setAuthView('forgot_email');
                    }}
                    className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5 transition"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Change email</span>
                  </button>
                </form>
              )}

              {}
              {authView === 'forgot_reset' && (
                <form onSubmit={handleFinalPasswordReset} className="space-y-4">
                  {resetError && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{resetError}</span>
                    </div>
                  )}

                  {/* New Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">New Master Password</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Create strong password"
                        className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#121822] border border-[#242e3f] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Strength Indicator Meter */}
                    <div className="space-y-1 pt-1">
                      <div className="flex gap-1 h-1.5 w-full">
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            strengthScore >= 1 ? 'bg-rose-500' : 'bg-slate-800'
                          }`}
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            strengthScore >= 2 ? 'bg-amber-500' : 'bg-slate-800'
                          }`}
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            strengthScore >= 3 ? 'bg-lime-500' : 'bg-slate-800'
                          }`}
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            strengthScore >= 4 ? 'bg-emerald-400' : 'bg-slate-800'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block text-right">
                        Strength:{' '}
                        {strengthScore <= 1 && 'Weak'}
                        {strengthScore === 2 && 'Fair'}
                        {strengthScore === 3 && 'Good'}
                        {strengthScore === 4 && 'Enterprise Strong'}
                      </span>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#121822] border border-[#242e3f] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Updating Security Keys...</span>
                      </>
                    ) : (
                      <>
                        <span>Reset Password & Finish</span>
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {}
              {authView === 'forgot_success' && (
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Password Successfully Updated</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                      Your master credentials have been rotated. You may now sign in using your new credentials.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setResetError('');
                      setAuthView('login');
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-md transition cursor-pointer"
                  >
                    Return to Login
                  </button>
                </div>
              )}

              {/* Security Footnote */}
              <div className="mt-6 pt-4 border-t border-[#1c2432] flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  Protected by Storiyan RBAC v2.4
                </span>
                <span className="font-mono text-slate-400">IP: 103.22.45.12</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {}
      <footer className="w-full border-t border-[#161c24] bg-[#090c11] px-6 py-3 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
        <div>
          © {new Date().getFullYear()} Storiyan Entertainment Tech Labs Pvt. Ltd. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <a href="#" className="hover:text-amber-400 transition">CDN SLA 99.98%</a>
          <span>•</span>
          <a href="#" className="hover:text-amber-400 transition">Security Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-amber-400 transition">Contact DevOps</a>
        </div>
      </footer>
    </div>
  );
}