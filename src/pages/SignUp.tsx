import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { PawLogo } from "@/components/PawLogo";
import { authService } from "@/services/authService";
import { toast } from "sonner";

export default function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      await authService.signUp({ fullName, email, password });
      toast.success("Account created!");
      navigate("/dashboard");
    } catch {
      toast.error("Sign up failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="app-shell flex flex-col items-center px-6 pt-12 pb-10 animate-fade-in">
      <PawLogo size="lg" />
      <h1 className="mt-5 text-3xl font-extrabold text-foreground">Create Account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Join PawMinder and care smarter</p>

      <form onSubmit={handleSubmit} className="w-full mt-8 space-y-5">
        <Field id="name" label="Full name" Icon={User} value={fullName} onChange={setFullName} placeholder="Jane Appleseed" />
        <Field id="email" label="Email" type="email" Icon={Mail} value={email} onChange={setEmail} placeholder="your@email.com" />
        <Field id="password" label="Password" type="password" Icon={Lock} value={password} onChange={setPassword} placeholder="••••••••" />

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 gradient-primary rounded-2xl text-primary-foreground font-extrabold text-base shadow-elevated disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold">Sign In</Link>
        </p>
      </form>
    </main>
  );
}

function Field({
  id, label, Icon, value, onChange, placeholder, type = "text",
}: {
  id: string; label: string; Icon: any; value: string;
  onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-foreground mb-2">{label}</label>
      <div className="relative">
        <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pl-11 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
