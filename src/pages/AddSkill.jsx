import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import SkillForm from "../components/SkillForm.jsx";
import useSkills from "../hooks/useSkills.js";

export default function AddSkill() {
  const { addSkill } = useSkills();
  const navigate = useNavigate();

  const handleSubmit = (skill) => {
    addSkill(skill);
    navigate("/skills");
  };

  return (
    <div className="grid gap-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-800 p-6 text-white shadow-soft sm:p-8">
        <Button as={Link} icon={ArrowLeft} to="/skills" variant="inverse">
          My Skills
        </Button>
        <h1 className="mt-6 text-3xl font-black tracking-normal sm:text-4xl">Add Skill</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
          Create a learning item with category, notes, and completed work. XP and level are awarded automatically.
        </p>
      </section>

      <section className="panel p-5 sm:p-6">
        <SkillForm onSubmit={handleSubmit} />
      </section>
    </div>
  );
}
