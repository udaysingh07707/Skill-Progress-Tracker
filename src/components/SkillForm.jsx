import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./Button.jsx";
import Input from "./Input.jsx";

const emptySkill = {
  name: "",
  category: "",
  progress: 0,
  xp: 0,
  level: "Level 1",
  notes: "",
};

export default function SkillForm({ initialSkill, onCancel, onSubmit, submitLabel = "Save Skill" }) {
  const [form, setForm] = useState(initialSkill ?? emptySkill);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(initialSkill ?? emptySkill);
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
    onSubmit(form);
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

      <div className="grid gap-5 md:grid-cols-3">
        <Input
          label="Progress"
          max="100"
          min="0"
          name="progress"
          onChange={handleChange}
          placeholder="75"
          type="number"
          value={form.progress}
        />
        <Input
          label="XP"
          min="0"
          name="xp"
          onChange={handleChange}
          placeholder="900"
          type="number"
          value={form.xp}
        />
        <Input
          label="Level"
          name="level"
          onChange={handleChange}
          placeholder="Level 3"
          value={form.level}
        />
      </div>

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
