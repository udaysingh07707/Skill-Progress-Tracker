export const clampProgress = (value) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return 0;
  return Math.min(100, Math.max(0, Math.round(numeric)));
};

export const normalizeXp = (value) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return 0;
  return Math.max(0, Math.round(numeric));
};

export const getSkillStatus = (progress) => {
  const normalized = clampProgress(progress);
  if (normalized >= 75) return "Advanced";
  if (normalized >= 40) return "Intermediate";
  return "Beginner";
};

export const getStatusClasses = (status) => {
  const classes = {
    Beginner: "bg-amber-50 text-amber-700 ring-amber-200",
    Intermediate: "bg-teal-50 text-teal-700 ring-teal-200",
    Advanced: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };

  return classes[status] ?? classes.Beginner;
};

export const calculateCurrentLevel = (totalXp) => {
  return Math.max(1, Math.floor(totalXp / 500) + 1);
};

export const calculateLevelProgress = (totalXp) => {
  const xpInLevel = totalXp % 500;
  return Math.round((xpInLevel / 500) * 100);
};

export const createSkillId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `skill-${Date.now()}`;
};

export const sortSkills = (skills, sortBy) => {
  const sorted = [...skills];

  if (sortBy === "progress") {
    return sorted.sort((a, b) => b.progress - a.progress);
  }

  if (sortBy === "xp") {
    return sorted.sort((a, b) => b.xp - a.xp);
  }

  return sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};
