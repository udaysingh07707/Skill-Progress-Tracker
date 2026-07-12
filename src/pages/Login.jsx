import { ArrowLeft, LockKeyhole, LogIn, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import useAuth from "../hooks/useAuth.js";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Please fill all login fields.");
      return;
    }

    setError("");
    login(form);
    navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
  };

  return (
    <main className="grid min-h-screen bg-slate-950 text-white lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative hidden overflow-hidden lg:block">
        <div className="login-visual">
          <div className="login-track login-track-one" />
          <div className="login-track login-track-two" />
          <div className="login-card login-card-one">
            <p className="text-sm font-bold text-emerald-100">Progress</p>
            <p className="mt-2 text-5xl font-black">82%</p>
          </div>
          <div className="login-card login-card-two">
            <p className="text-sm font-bold text-cyan-100">Auto XP</p>
            <p className="mt-2 text-5xl font-black">820</p>
          </div>
          <div className="login-card login-card-three">
            <p className="text-sm font-bold text-amber-100">Level</p>
            <p className="mt-2 text-5xl font-black">4</p>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center px-4 py-8 sm:px-6 lg:px-12">
        <div className="mx-auto w-full max-w-xl">
          <Button as={Link} icon={ArrowLeft} to="/" variant="inverse">
            Front Page
          </Button>

          <div className="mt-10">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-slate-950 shadow-2xl">
              <LockKeyhole className="h-7 w-7" aria-hidden="true" />
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-normal sm:text-5xl">
              Login to Skill Progress Tracker
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Enter your details to open the dashboard and continue tracking your skill growth.
            </p>
          </div>

          <form
            className="mt-8 rounded-3xl bg-white p-5 text-slate-950 shadow-2xl sm:p-6"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5">
              <Input
                error={error}
                label="Name"
                name="name"
                onChange={handleChange}
                placeholder="Your name"
                value={form.name}
              />
              <Input
                label="Email"
                name="email"
                onChange={handleChange}
                placeholder="you@example.com"
                type="email"
                value={form.email}
              />
              <Input
                label="Password"
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
                type="password"
                value={form.password}
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-800 ring-1 ring-emerald-100">
                <UserRound className="h-5 w-5" aria-hidden="true" />
                <p className="mt-2 text-sm font-bold">Personal dashboard</p>
              </div>
              <div className="rounded-2xl bg-cyan-50 p-4 text-cyan-800 ring-1 ring-cyan-100">
                <Mail className="h-5 w-5" aria-hidden="true" />
                <p className="mt-2 text-sm font-bold">Local profile data</p>
              </div>
            </div>

            <Button className="mt-6 w-full min-h-12 text-base" icon={LogIn} type="submit" variant="accent">
              Open Dashboard
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
