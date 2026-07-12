import { BarChart3, Menu, PlusCircle, UserRound, X, GraduationCap } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/", icon: BarChart3 },
  { label: "My Skills", path: "/skills", icon: GraduationCap },
  { label: "Add Skill", path: "/add-skill", icon: PlusCircle },
  { label: "Profile", path: "/profile", icon: UserRound },
];

const navClass = ({ isActive }) =>
  `inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
    isActive ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
  }`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-900/10">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate text-base font-black tracking-normal text-slate-950 sm:text-lg">
            Skill Progress Tracker
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink className={navClass} end={item.path === "/"} key={item.path} to={item.path}>
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <NavLink
                className={navClass}
                end={item.path === "/"}
                key={item.path}
                onClick={() => setIsOpen(false)}
                to={item.path}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
