const accentStyles = {
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  rose: "bg-rose-50 text-rose-700 ring-rose-100",
  cyan: "bg-cyan-50 text-cyan-700 ring-cyan-100",
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-100",
};

export default function StatCard({ accent = "emerald", detail, icon: Icon, title, value }) {
  return (
    <article className="panel interactive p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-normal text-slate-950">{value}</p>
        </div>
        {Icon ? (
          <div className={`rounded-2xl p-3 ring-1 ${accentStyles[accent]}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        ) : null}
      </div>
      {detail ? <p className="mt-4 text-sm text-slate-500">{detail}</p> : null}
    </article>
  );
}
