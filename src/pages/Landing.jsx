import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import useAuth from "../hooks/useAuth.js";

const highlights = [
  { label: "Auto XP", icon: Sparkles },
  { label: "Skill Levels", icon: Trophy },
  { label: "Progress Dashboard", icon: BarChart3 },
];

const floatingSkills = [
  { name: "React.js", value: 82, tone: "emerald" },
  { name: "Tailwind CSS", value: 68, tone: "cyan" },
  { name: "Node APIs", value: 45, tone: "amber" },
];

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const destination = isAuthenticated ? "/dashboard" : "/login";

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="landing-scene relative flex min-h-[92vh] items-center">
        <div className="landing-grid" />

        <header className="absolute left-0 right-0 top-0 z-20">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link className="flex items-center gap-3" to="/">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-950 shadow-2xl">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-lg font-black tracking-normal">Skill Progress Tracker</span>
            </Link>
            <Button as={Link} icon={ArrowRight} to={destination} variant="light">
              {isAuthenticated ? "Dashboard" : "Login"}
            </Button>
          </div>
        </header>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
          <div className="flex min-h-[70vh] max-w-3xl flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-emerald-100 ring-1 ring-white/15 backdrop-blur">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Smart progress, honest levels
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-normal text-white sm:text-6xl lg:text-7xl">
              Skill Progress Tracker
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              A modern learning dashboard where completed work decides XP, level,
              streaks, and progress. No fake points, just visible momentum.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                as={Link}
                className="min-h-12 px-6 text-base"
                icon={ArrowRight}
                to={destination}
                variant="light"
              >
                Start Tracking
              </Button>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-xl px-6 text-base font-bold text-white ring-1 ring-white/20 transition hover:bg-white/10"
                to="/login"
              >
                Go to Login
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur transition hover:bg-white/15"
                  key={item.label}
                >
                  <item.icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-white">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="landing-stage hidden lg:block" aria-hidden="true">
          <div className="scene-panel scene-panel-main">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase text-emerald-200">Today</p>
                <h2 className="mt-1 text-2xl font-black">Learning Board</h2>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-slate-950">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {floatingSkills.map((skill, index) => (
                <div className={`scene-skill scene-delay-${index}`} key={skill.name}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{skill.name}</span>
                    <span className="text-sm font-black text-emerald-200">{skill.value}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`progress-loop progress-${skill.tone}`}
                      style={{ "--target-width": `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="scene-panel scene-panel-top">
            <p className="text-sm font-bold text-cyan-100">Total XP</p>
            <p className="mt-2 text-4xl font-black">2,320</p>
          </div>

          <div className="scene-panel scene-panel-bottom">
            <p className="text-sm font-bold text-amber-100">Current Level</p>
            <p className="mt-2 text-4xl font-black">5</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {["Track every skill", "Earn XP automatically", "Review progress clearly"].map((title) => (
            <article className="rounded-2xl border border-slate-200 p-5 shadow-card" key={title}>
              <h2 className="text-lg font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Built for focused learning with clean cards, filters, progress bars, and local data.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
