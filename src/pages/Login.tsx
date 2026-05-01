import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Check } from "lucide-react";
import { PawLogo } from "@/components/PawLogo";
import { authService } from "@/services/authService";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }
    setSubmitting(true);
    try {
      await authService.login({ email, password, rememberMe: remember });
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    setSubmitting(true);
    try {
      await authService.oauth(provider);
      navigate("/dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="app-shell flex flex-col items-center px-6 pt-12 pb-10 animate-fade-in">
      <PawLogo size="lg" />
      <h1 className="mt-5 text-4xl font-extrabold text-foreground">PawMinder</h1>
      <p className="mt-1 text-sm text-muted-foreground">Your pet's health companion</p>

      <form onSubmit={handleSubmit} className="w-full mt-10 space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2">Email</label>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-foreground mb-2">Password</label>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-12 pl-11 pr-11 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground p-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span
              className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                remember
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-foreground border-foreground text-background"
              }`}
            >
              {remember && <Check size={14} strokeWidth={3} />}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span className="text-sm font-bold text-foreground">Remember me</span>
          </label>
          <button
            type="button"
            onClick={async () => {
              if (!email) { toast.error("Enter your email first"); return; }
              // 🔌 API: POST /auth/forgot-password
              const { petService } = await import("@/services/petService");
              await petService.requestPasswordReset(email);
              toast.success("Reset link sent if the email exists");
            }}
            className="text-sm font-bold text-primary"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full h-13 py-3.5 gradient-primary rounded-2xl text-primary-foreground font-extrabold text-base shadow-elevated disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-bold">Create Account</Link>
        </p>

        <div className="flex items-center gap-3 pt-2">
          <span className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">Or continue with</span>
          <span className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="h-12 rounded-xl bg-card border border-border flex items-center justify-center gap-2 font-bold text-foreground"
          >
            <GoogleGlyph />
            Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("apple")}
            className="h-12 rounded-xl bg-card border border-border flex items-center justify-center gap-2 font-bold text-foreground"
          >
            <AppleGlyph />
            Apple
          </button>
        </div>
      </form>
    </main>
  );
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8a12 12 0 1 1 7.9-21l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.6 5.1A20 20 0 0 0 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C41 35 44 30 44 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}
function AppleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.5 12.7c0-2.5 2-3.7 2.1-3.7-1.2-1.7-3-2-3.7-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.3.9 1.2 1.9 2.6 3.2 2.6 1.3 0 1.7-.8 3.3-.8 1.5 0 1.9.8 3.3.8 1.4 0 2.2-1.3 3.1-2.5.9-1.4 1.3-2.7 1.3-2.8 0 0-2.6-1-2.6-3.5zM14 5.4c.7-.9 1.2-2 1-3.4-1 .1-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.3 1.2.1 2.4-.6 3.1-1.5z"/>
    </svg>
  );
}
