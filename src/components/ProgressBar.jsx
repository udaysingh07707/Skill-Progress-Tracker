import { clampProgress } from "../utils/skillUtils.js";

const sizeClasses = {
  sm: "h-2",
  md: "h-3",
  lg: "h-4",
};

export default function ProgressBar({ className = "", label, showValue = true, size = "md", value }) {
  const normalized = clampProgress(value);
  const color =
    normalized >= 75
      ? "from-emerald-500 to-teal-500"
      : normalized >= 40
        ? "from-teal-500 to-cyan-500"
        : "from-amber-400 to-orange-500";

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          {label ? <span className="font-semibold text-slate-700">{label}</span> : <span />}
          {showValue ? <span className="font-bold text-slate-950">{normalized}%</span> : null}
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-slate-100 ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500 ease-out`}
          style={{ width: `${normalized}%` }}
        />
      </div>
    </div>
  );
}
