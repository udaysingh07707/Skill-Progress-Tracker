const variants = {
  primary:
    "bg-slate-950 text-white shadow-sm hover:bg-slate-800 focus-visible:ring-slate-400",
  secondary:
    "bg-white text-slate-800 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus-visible:ring-slate-400",
  accent:
    "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 focus-visible:ring-emerald-300",
  danger:
    "bg-rose-600 text-white shadow-sm hover:bg-rose-700 focus-visible:ring-rose-300",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-slate-300",
  light:
    "bg-white text-slate-950 shadow-sm hover:bg-cyan-50 focus-visible:ring-white/50",
  inverse:
    "bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/20 focus-visible:ring-white/40",
};

export default function Button({
  as: Component = "button",
  children,
  className = "",
  icon: Icon,
  type = "button",
  variant = "primary",
  ...props
}) {
  const buttonProps = Component === "button" ? { type } : {};

  return (
    <Component
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...buttonProps}
      {...props}
    >
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      {children}
    </Component>
  );
}
