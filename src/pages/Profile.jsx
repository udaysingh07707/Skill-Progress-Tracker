import { Award, BadgeCheck, Flame, Sparkles, Target, Trophy, UserRound } from "lucide-react";
import ProgressBar from "../components/ProgressBar.jsx";
import StatCard from "../components/StatCard.jsx";
import useAuth from "../hooks/useAuth.js";
import useSkills from "../hooks/useSkills.js";

export default function Profile() {
  const { user } = useAuth();
  const { stats } = useSkills();
  const achievements = [
    {
      title: "First Skill",
      detail: "Added at least one skill",
      icon: BadgeCheck,
      unlocked: stats.totalSkills >= 1,
    },
    {
      title: "XP Collector",
      detail: "Earned 1,000 XP",
      icon: Sparkles,
      unlocked: stats.totalXp >= 1000,
    },
    {
      title: "Focused Learner",
      detail: "Maintained a learning streak",
      icon: Flame,
      unlocked: stats.learningStreak > 0,
    },
    {
      title: "Completionist",
      detail: "Completed 3 skills",
      icon: Trophy,
      unlocked: stats.completedSkills >= 3,
    },
  ];

  return (
    <div className="grid gap-6">
      <section className="panel overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600" />
        <div className="p-5 sm:p-6">
          <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="grid h-24 w-24 place-items-center rounded-3xl border-4 border-white bg-slate-950 text-white shadow-soft">
                <UserRound className="h-11 w-11" aria-hidden="true" />
              </div>
              <div className="pb-1">
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Profile</p>
                <h1 className="text-3xl font-black tracking-normal text-slate-950">
                  {user?.name || "Skill Builder"}
                </h1>
                {user?.email ? <p className="mt-1 text-sm font-semibold text-slate-500">{user.email}</p> : null}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
              <p className="text-sm font-semibold text-slate-500">Current Level</p>
              <p className="text-3xl font-black text-slate-950">{stats.currentLevel}</p>
            </div>
          </div>

          <ProgressBar className="mt-6" label="XP Progress" value={stats.xpProgress} />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          accent="rose"
          detail="Total earned points"
          icon={Sparkles}
          title="Total XP"
          value={stats.totalXp.toLocaleString()}
        />
        <StatCard
          accent="indigo"
          detail="XP milestone level"
          icon={Award}
          title="Current Level"
          value={stats.currentLevel}
        />
        <StatCard
          accent="emerald"
          detail="Completed skills"
          icon={BadgeCheck}
          title="Skills Learned"
          value={stats.skillsLearned}
        />
        <StatCard
          accent="amber"
          detail="Active goals"
          icon={Target}
          title="In Progress"
          value={stats.inProgressSkills}
        />
      </section>

      <section className="panel p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Achievements</h2>
            <p className="mt-1 text-sm text-slate-500">Milestones from your learning activity</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {achievements.map((achievement) => (
            <article
              className={`rounded-2xl border p-4 transition ${
                achievement.unlocked
                  ? "border-emerald-100 bg-emerald-50"
                  : "border-slate-100 bg-slate-50 opacity-70"
              }`}
              key={achievement.title}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-2xl p-3 ring-1 ${
                    achievement.unlocked
                      ? "bg-white text-emerald-700 ring-emerald-100"
                      : "bg-white text-slate-400 ring-slate-100"
                  }`}
                >
                  <achievement.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">{achievement.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{achievement.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
