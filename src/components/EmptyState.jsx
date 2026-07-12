import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button.jsx";

export default function EmptyState({
  actionLabel = "Add Skill",
  icon: Icon = PlusCircle,
  message,
  title,
  to = "/add-skill",
}) {
  return (
    <section className="panel flex min-h-72 flex-col items-center justify-center px-6 py-10 text-center">
      <div className="rounded-3xl bg-teal-50 p-4 text-teal-700 ring-1 ring-teal-100">
        <Icon className="h-8 w-8" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-950">{title}</h2>
      {message ? <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{message}</p> : null}
      <Button as={Link} className="mt-6" icon={PlusCircle} to={to}>
        {actionLabel}
      </Button>
    </section>
  );
}
