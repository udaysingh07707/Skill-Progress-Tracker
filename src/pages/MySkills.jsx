import { Filter, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../components/Button.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Input from "../components/Input.jsx";
import Modal from "../components/Modal.jsx";
import SkillCard from "../components/SkillCard.jsx";
import SkillForm from "../components/SkillForm.jsx";
import useSkills from "../hooks/useSkills.js";
import { getSkillStatus, sortSkills } from "../utils/skillUtils.js";

export default function MySkills() {
  const { categories, deleteSkill, skills, updateSkill } = useSkills();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [editingSkill, setEditingSkill] = useState(null);
  const [deletingSkill, setDeletingSkill] = useState(null);

  const filteredSkills = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = skills.filter((skill) => {
      const matchesSearch =
        !normalizedSearch ||
        skill.name.toLowerCase().includes(normalizedSearch) ||
        skill.category.toLowerCase().includes(normalizedSearch) ||
        skill.notes.toLowerCase().includes(normalizedSearch);
      const matchesCategory = category === "All" || skill.category === category;
      const matchesStatus = status === "All" || getSkillStatus(skill.progress) === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    return sortSkills(filtered, sortBy);
  }, [category, search, skills, sortBy, status]);

  const handleEdit = (form) => {
    updateSkill(editingSkill.id, form);
    setEditingSkill(null);
  };

  const handleDelete = () => {
    deleteSkill(deletingSkill.id);
    setDeletingSkill(null);
  };

  return (
    <div className="grid gap-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-teal-700">My Skills</p>
          <h1 className="mt-2 text-3xl font-black tracking-normal text-slate-950">Skill Library</h1>
        </div>
      </section>

      <section className="panel p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <label className="relative block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Search</span>
            <Search className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 text-slate-400" />
            <input
              className="min-h-11 w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search skills"
              value={search}
            />
          </label>

          <Input
            as="select"
            label="Category"
            name="categoryFilter"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            <option>All</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Input>

          <Input
            as="select"
            label="Status"
            name="statusFilter"
            onChange={(event) => setStatus(event.target.value)}
            value={status}
          >
            <option>All</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </Input>

          <Input
            as="select"
            label="Sort"
            name="sortBy"
            onChange={(event) => setSortBy(event.target.value)}
            value={sortBy}
          >
            <option value="recent">Recently Updated</option>
            <option value="progress">Progress</option>
            <option value="xp">XP</option>
          </Input>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
            <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            {filteredSkills.length} shown
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            Sorted by {sortBy === "xp" ? "XP" : sortBy}
          </span>
        </div>
      </section>

      {skills.length === 0 ? (
        <EmptyState
          message="Create a skill and it will appear here with progress, XP, level, and notes."
          title="Your skill library is empty"
        />
      ) : filteredSkills.length === 0 ? (
        <EmptyState
          actionLabel="Add Another Skill"
          message="Try changing the search, category, status, or sort controls."
          title="No matching skills"
        />
      ) : (
        <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              onDelete={setDeletingSkill}
              onEdit={setEditingSkill}
              skill={skill}
            />
          ))}
        </section>
      )}

      <Modal
        description="Update completed work or notes. XP and level recalculate automatically."
        onClose={() => setEditingSkill(null)}
        open={Boolean(editingSkill)}
        title="Edit Skill"
      >
        <SkillForm
          initialSkill={editingSkill}
          onCancel={() => setEditingSkill(null)}
          onSubmit={handleEdit}
          submitLabel="Update Skill"
        />
      </Modal>

      <Modal
        description="This removes the skill from LocalStorage."
        onClose={() => setDeletingSkill(null)}
        open={Boolean(deletingSkill)}
        title="Delete Skill"
      >
        <div className="rounded-2xl bg-rose-50 p-4 text-sm leading-6 text-rose-800 ring-1 ring-rose-100">
          Delete <span className="font-bold">{deletingSkill?.name}</span>?
        </div>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button onClick={() => setDeletingSkill(null)} variant="secondary">
            Cancel
          </Button>
          <Button icon={Trash2} onClick={handleDelete} variant="danger">
            Delete Skill
          </Button>
        </div>
      </Modal>
    </div>
  );
}
