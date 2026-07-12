export default function Input({
  as = "input",
  children,
  className = "",
  error,
  id,
  label,
  ...props
}) {
  const Component = as;
  const inputId = id ?? props.name;

  return (
    <label className={`block ${className}`} htmlFor={inputId}>
      {label ? (
        <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      ) : null}
      <Component
        id={inputId}
        className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        {...props}
      >
        {children}
      </Component>
      {error ? <span className="mt-1.5 block text-xs font-medium text-rose-600">{error}</span> : null}
    </label>
  );
}
