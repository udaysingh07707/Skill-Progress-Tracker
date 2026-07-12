import { createContext, useMemo } from "react";
import { initialSkills } from "../data/initialSkills.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import {
  calculateCurrentLevel,
  calculateLevelProgress,
  calculateSkillLevel,
  calculateSkillXp,
  clampProgress,
  createSkillId,
  getSkillStatus,
} from "../utils/skillUtils.js";

export const SkillContext = createContext(null);

const STORAGE_KEY = "skill-progress-tracker:skills";

const normalizeSkill = (skill, { preserveUpdatedAt = false } = {}) => {
  const now = new Date().toISOString();
  const progress = clampProgress(skill.progress);

  return {
    id: skill.id ?? createSkillId(),
    name: skill.name?.trim() || "Untitled Skill",
    category: skill.category?.trim() || "General",
    progress,
    xp: calculateSkillXp(progress),
    level: calculateSkillLevel(progress),
    notes: skill.notes?.trim() || "",
    createdAt: skill.createdAt ?? now,
    updatedAt: preserveUpdatedAt ? skill.updatedAt ?? now : now,
  };
};

export function SkillProvider({ children }) {
  const [storedSkills, setStoredSkills] = useLocalStorage(STORAGE_KEY, initialSkills);
  const skills = useMemo(
    () => storedSkills.map((skill) => normalizeSkill(skill, { preserveUpdatedAt: true })),
    [storedSkills]
  );

  const addSkill = (skill) => {
    setStoredSkills((currentSkills) => [normalizeSkill(skill), ...currentSkills]);
  };

  const updateSkill = (id, updates) => {
    setStoredSkills((currentSkills) =>
      currentSkills.map((skill) =>
        skill.id === id
          ? normalizeSkill({ ...skill, ...updates, id, createdAt: skill.createdAt })
          : skill
      )
    );
  };

  const deleteSkill = (id) => {
    setStoredSkills((currentSkills) => currentSkills.filter((skill) => skill.id !== id));
  };

  const stats = useMemo(() => {
    const totalSkills = skills.length;
    const completedSkills = skills.filter((skill) => skill.progress >= 100).length;
    const inProgressSkills = skills.filter(
      (skill) => skill.progress > 0 && skill.progress < 100
    ).length;
    const totalXp = skills.reduce((sum, skill) => sum + skill.xp, 0);
    const currentLevel = calculateCurrentLevel(totalXp);
    const xpProgress = calculateLevelProgress(totalXp);
    const recentSkills = [...skills]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 4);

    return {
      totalSkills,
      completedSkills,
      inProgressSkills,
      totalXp,
      currentLevel,
      xpProgress,
      recentSkills,
      skillsLearned: completedSkills,
    };
  }, [skills]);

  const categories = useMemo(() => {
    return [...new Set(skills.map((skill) => skill.category))].sort();
  }, [skills]);

  const value = useMemo(
    () => ({
      skills,
      stats,
      categories,
      addSkill,
      updateSkill,
      deleteSkill,
      getSkillStatus,
    }),
    [skills, stats, categories]
  );

  return <SkillContext.Provider value={value}>{children}</SkillContext.Provider>;
}
