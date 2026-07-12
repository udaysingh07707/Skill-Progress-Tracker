import {
  Activity,
  Award,
  BookOpen,
  CalendarCheck,
  Flame,
  PlusCircle,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import StatCard from "../components/StatCard.jsx";
import useSkills from "../hooks/useSkills.js";

const streakDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Dashboard() {
  const { skills, stats } = useSkills();

  const categoryOverview = Object.values(
    skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = { category: skill.category, count: 0, progress: 0 };
      }

      acc[skill.category].count += 1;
      acc[skill.category].progress += skill.progress;
      return acc;
    }, {})
  ).map((item) => ({
    ...item,
    average: Math.round(item.progress / item.count),
  }));

  return (
    <div className="grid gap-6">
      <section className="app-accent-surface">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-emerald-50 ring-1 ring-white/20">
              Dashboard
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-normal sm:text-4xl">
              Skill Progress Tracker
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-cyan-50 sm:text-base">
              Track XP, monitor progress, and keep your learning momentum visible.
            </p>
          </div>
          <Button as={Link} className="w-full sm:w-auto" icon={PlusCircle} to="/add-skill" variant="light">
            Add Skill
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          accent="cyan"
          detail="Skills in your tracker"
          icon={BookOpen}
          title="Total Skills"
          value={stats.totalSkills}
        />
        <StatCard
          accent="emerald"
          detail="Reached 100% progress"
          icon={Trophy}
          title="Completed Skills"
          value={stats.completedSkills}
        />
        <StatCard
          accent="amber"
          detail="Active learning paths"
          icon={Activity}
          title="In Progress"
          value={stats.inProgressSkills}
        />
        <StatCard
          accent="rose"
          detail="Earned across all skills"
          icon={Sparkles}
          title="Total XP"
          value={stats.totalXp.toLocaleString()}
        />
        <StatCard
          accent="indigo"
          detail="Based on XP milestones"
          icon={Award}
          title="Current Level"
          value={stats.currentLevel}
        />
      </section>

      {skills.length === 0 ? (
        <EmptyState
          message="Add your first skill to start tracking progress, XP, and achievements."
          title="No skills yet"
        />
      ) : (
        <section className="grid gap-6 xl:grid-cols-3">
          <div className="grid gap-6 xl:col-span-2">
            <div className="panel p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">Recent Skills</h2>
                  <p className="mt-1 text-sm text-slate-500">Latest updated learning items</p>
                </div>
                <Link
                  className="text-sm font-bold text-teal-700 transition hover:text-teal-950"
                  to="/skills"
                >
                  View all
                </Link>
              </div>

              <div className="mt-5 grid gap-3">
                {stats.recentSkills.map((skill) => (
                  <Link
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-teal-200 hover:bg-white hover:shadow-card"
                    key={skill.id}
                    to="/skills"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="truncate font-bold text-slate-950">{skill.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{skill.category}</p>
                      </div>
                      <div className="w-full sm:w-48">
                        <ProgressBar showValue={false} size="sm" value={skill.progress} />
                        <p className="mt-2 text-right text-xs font-bold text-slate-500">
                          {skill.progress}% complete
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="panel p-5 sm:p-6">
              <h2 className="text-xl font-bold text-slate-950">Progress Overview</h2>
              <div className="mt-5 grid gap-4">
                {categoryOverview.map((item) => (
                  <ProgressBar
                    key={item.category}
                    label={`${item.category} (${item.count})`}
                    value={item.average}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="panel p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-50 p-3 text-amber-600 ring-1 ring-amber-100">
                  <Flame className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-950">Learning Streak</h2>
                  <p className="text-sm text-slate-500">
                    {stats.learningStreak} day{stats.learningStreak === 1 ? "" : "s"} streak
                  </p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-7 gap-2">
                {streakDays.map((day, index) => (
                  <div
                    className={`grid aspect-square place-items-center rounded-2xl text-xs font-black ring-1 ${
                      stats.weekActivity[index]
                        ? "bg-amber-400 text-slate-950 ring-amber-300"
                        : "bg-slate-50 text-slate-400 ring-slate-100"
                    }`}
                    key={day}
                    title={day}
                  >
                    {day.slice(0, 1)}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-700 ring-1 ring-cyan-100">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-950">XP Progress</h2>
                  <p className="text-sm text-slate-500">Level {stats.currentLevel}</p>
                </div>
              </div>
              <ProgressBar className="mt-5" label="Next Level" value={stats.xpProgress} />
              <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {500 - (stats.totalXp % 500)} XP until level {stats.currentLevel + 1}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
