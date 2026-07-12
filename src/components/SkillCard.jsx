import { Award, Pencil, Trash2 } from "lucide-react";
import { getSkillStatus, getStatusClasses } from "../utils/skillUtils.js";
import Button from "./Button.jsx";
import ProgressBar from "./ProgressBar.jsx";

export default function SkillCard({ onDelete, onEdit, skill }) {
  const status = getSkillStatus(skill.progress);

  return (
    <article className="panel interactive flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-slate-950">{skill.name}</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">{skill.category}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ring-1 ${getStatusClasses(status)}`}
        >
          {status}
        </span>
      </div>

      <ProgressBar className="mt-5" label="Progress" value={skill.progress} />

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase text-slate-400">XP</p>
          <p className="mt-1 text-lg font-bold text-slate-950">{skill.xp.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase text-slate-400">Level</p>
          <p className="mt-1 flex items-center gap-2 text-lg font-bold text-slate-950">
            <Award className="h-4 w-4 text-amber-500" aria-hidden="true" />
            {skill.level}
          </p>
        </div>
      </div>

      {skill.notes ? (
        <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">{skill.notes}</p>
      ) : (
        <p className="mt-4 min-h-10 text-sm leading-5 text-slate-400">No notes added yet.</p>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <Button className="flex-1" icon={Pencil} onClick={() => onEdit(skill)} variant="secondary">
          Edit
        </Button>
        <Button className="flex-1" icon={Trash2} onClick={() => onDelete(skill)} variant="ghost">
          Delete
        </Button>
      </div>
    </article>
  );
}
