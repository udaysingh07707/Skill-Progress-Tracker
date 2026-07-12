import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import useAuth from "../hooks/useAuth.js";
import useSkills from "../hooks/useSkills.js";

const highlights = [
  { label: "Auto XP", icon: Sparkles },
  { label: "Skill Levels", icon: Trophy },
  { label: "Progress Dashboard", icon: BarChart3 },
];

const previewSteps = [
  { id: "login", title: "Login with email", detail: "Private local space" },
  { id: "add", title: "Add your skills", detail: "Start from empty" },
  { id: "track", title: "Track real progress", detail: "XP updates live" },
];

const progressTones = ["emerald", "cyan", "amber"];

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const { stats } = useSkills();
  const boardSkills = stats.recentSkills.slice(0, 3).map((skill, index) => ({
    id: skill.id,
    name: skill.name,
    value: skill.progress,
    tone: progressTones[index % progressTones.length],
  }));

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
            <Button as={Link} icon={ArrowRight} to="/login" variant="light">
              Sign In
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
                to="/login"
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
                <p className="text-sm font-bold uppercase text-emerald-200">
                  {isAuthenticated ? "Today" : "Start here"}
                </p>
                <h2 className="mt-1 text-2xl font-black">
                  {isAuthenticated ? "Learning Board" : "Build Your Board"}
                </h2>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-slate-950">
                {isAuthenticated ? (
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <PlusCircle className="h-6 w-6" aria-hidden="true" />
                )}
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {boardSkills.length > 0
                ? boardSkills.map((skill, index) => (
                    <div className={`scene-skill scene-delay-${index}`} key={skill.id}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{skill.name}</span>
                        <span className="text-sm font-black text-emerald-200">
                          {skill.value}%
                        </span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`progress-loop progress-${skill.tone}`}
                          style={{ "--target-width": `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  ))
                : previewSteps.map((step, index) => (
                    <div className={`scene-skill scene-delay-${index}`} key={step.id}>
                      <div className="flex items-start gap-3">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-sm font-black text-slate-950">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold">{step.title}</p>
                          <p className="mt-1 text-sm font-semibold text-emerald-100">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <div className="scene-panel scene-panel-top">
            <p className="text-sm font-bold text-cyan-100">
              {isAuthenticated ? "Total XP" : "Private Data"}
            </p>
            <p className={`mt-2 font-black ${isAuthenticated ? "text-4xl" : "text-xl"}`}>
              {isAuthenticated ? stats.totalXp.toLocaleString() : "Per Email"}
            </p>
          </div>

          <div className="scene-panel scene-panel-bottom">
            <p className="text-sm font-bold text-amber-100">
              {isAuthenticated ? "Current Level" : "Local Save"}
            </p>
            <p className={`mt-2 font-black ${isAuthenticated ? "text-4xl" : "text-xl"}`}>
              {isAuthenticated ? stats.currentLevel : "Same Device"}
            </p>
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
