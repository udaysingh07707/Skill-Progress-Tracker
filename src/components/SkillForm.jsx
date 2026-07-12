import { Award, Save, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  calculateSkillLevel,
  calculateSkillXp,
  clampProgress,
} from "../utils/skillUtils.js";
import Button from "./Button.jsx";
import Input from "./Input.jsx";

const emptySkill = {
  name: "",
  category: "",
  progress: 0,
  notes: "",
};

const getFormState = (skill) => ({
  name: skill?.name ?? "",
  category: skill?.category ?? "",
  progress: skill?.progress ?? 0,
  notes: skill?.notes ?? "",
});

export default function SkillForm({ initialSkill, onCancel, onSubmit, submitLabel = "Save Skill" }) {
  const [form, setForm] = useState(getFormState(initialSkill));
  const [error, setError] = useState("");
  const completedWork = clampProgress(form.progress);
  const earnedXp = calculateSkillXp(completedWork);
  const earnedLevel = calculateSkillLevel(completedWork);

  useEffect(() => {
    setForm(initialSkill ? getFormState(initialSkill) : emptySkill);
  }, [initialSkill]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Skill name is required.");
      return;
    }

    setError("");
    onSubmit({
      name: form.name,
      category: form.category,
      progress: completedWork,
      notes: form.notes,
    });
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          error={error}
          label="Skill Name"
          name="name"
          onChange={handleChange}
          placeholder="React.js"
          value={form.name}
        />
        <Input
          label="Category"
          name="category"
          onChange={handleChange}
          placeholder="Frontend"
          value={form.category}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
        <Input
          label="Work Completed (%)"
          max="100"
          min="0"
          name="progress"
          onChange={handleChange}
          placeholder="75"
          type="number"
          value={form.progress}
        />
        <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-emerald-700 shadow-sm">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-emerald-700">Auto XP</p>
              <p className="text-2xl font-black text-slate-950">{earnedXp.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-cyan-50 p-4 ring-1 ring-cyan-100">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-cyan-700 shadow-sm">
              <Award className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-cyan-700">Auto Level</p>
              <p className="text-2xl font-black text-slate-950">{earnedLevel}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600 ring-1 ring-slate-100">
        XP and level are calculated from completed work, so users cannot edit them manually.
      </p>

      <Input
        as="textarea"
        label="Notes"
        name="notes"
        onChange={handleChange}
        placeholder="What are you practicing next?"
        rows="5"
        value={form.notes}
      />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel ? (
          <Button icon={X} onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        ) : null}
        <Button icon={Save} type="submit" variant="accent">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
