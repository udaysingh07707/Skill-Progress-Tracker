import { BarChart3, GraduationCap, PlusCircle, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import useSkills from "../hooks/useSkills.js";
import ProgressBar from "./ProgressBar.jsx";

const links = [
  { label: "Dashboard", path: "/dashboard", icon: BarChart3 },
  { label: "My Skills", path: "/skills", icon: GraduationCap },
  { label: "Add Skill", path: "/add-skill", icon: PlusCircle },
  { label: "Profile", path: "/profile", icon: UserRound },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
    isActive ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
  }`;

export default function Sidebar() {
  const { stats } = useSkills();

  return (
    <aside className="sticky top-24 hidden h-fit w-64 shrink-0 lg:block">
      <div className="panel p-4">
        <p className="px-3 text-xs font-bold uppercase tracking-wide text-slate-400">Workspace</p>
        <nav className="mt-3 grid gap-1" aria-label="Dashboard navigation">
          {links.map((link) => (
            <NavLink className={linkClass} end={link.path === "/dashboard"} key={link.path} to={link.path}>
              <link.icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="panel mt-4 p-4">
        <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-800 p-4 text-white">
          <p className="text-sm font-semibold text-emerald-100">Current Level</p>
          <p className="mt-2 text-4xl font-black">{stats.currentLevel}</p>
          <ProgressBar
            className="mt-4"
            showValue={false}
            size="sm"
            value={stats.xpProgress}
          />
          <p className="mt-3 text-xs font-medium text-emerald-100">
            {stats.xpProgress}% toward next level
          </p>
        </div>
      </div>
    </aside>
  );
}
