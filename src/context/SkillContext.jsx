import { createContext, useCallback, useMemo } from "react";
import useAuth from "../hooks/useAuth.js";
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

const EMPTY_SKILLS = [];
const STORAGE_KEY_PREFIX = "skill-progress-tracker:skills";

const getSkillsStorageKey = (email) => {
  const normalizedEmail = email?.trim().toLowerCase();
  return normalizedEmail ? `${STORAGE_KEY_PREFIX}:${normalizedEmail}` : null;
};

const getDateKey = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 10);
};

const getStartOfWeek = (dateValue) => {
  const date = new Date(dateValue);
  const dayOffset = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - dayOffset);
  date.setHours(0, 0, 0, 0);
  return date;
};

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
  const { user } = useAuth();
  const isAuthenticated = Boolean(user?.email?.trim());
  const storageKey = useMemo(() => getSkillsStorageKey(user?.email), [user?.email]);
  const [storedSkills, setStoredSkills] = useLocalStorage(storageKey, EMPTY_SKILLS);
  const skills = useMemo(
    () =>
      isAuthenticated && Array.isArray(storedSkills)
        ? storedSkills.map((skill) => normalizeSkill(skill, { preserveUpdatedAt: true }))
        : EMPTY_SKILLS,
    [isAuthenticated, storedSkills]
  );

  const addSkill = useCallback((skill) => {
    if (!isAuthenticated) return;

    setStoredSkills((currentSkills) => [
      normalizeSkill(skill),
      ...(Array.isArray(currentSkills) ? currentSkills : EMPTY_SKILLS),
    ]);
  }, [isAuthenticated, setStoredSkills]);

  const updateSkill = useCallback((id, updates) => {
    if (!isAuthenticated) return;

    setStoredSkills((currentSkills) =>
      (Array.isArray(currentSkills) ? currentSkills : EMPTY_SKILLS).map((skill) =>
        skill.id === id
          ? normalizeSkill({ ...skill, ...updates, id, createdAt: skill.createdAt })
          : skill
      )
    );
  }, [isAuthenticated, setStoredSkills]);

  const deleteSkill = useCallback((id) => {
    if (!isAuthenticated) return;

    setStoredSkills((currentSkills) =>
      (Array.isArray(currentSkills) ? currentSkills : EMPTY_SKILLS).filter(
        (skill) => skill.id !== id
      )
    );
  }, [isAuthenticated, setStoredSkills]);

  const stats = useMemo(() => {
    const totalSkills = skills.length;
    const completedSkills = skills.filter((skill) => skill.progress >= 100).length;
    const inProgressSkills = skills.filter(
      (skill) => skill.progress > 0 && skill.progress < 100
    ).length;
    const totalXp = skills.reduce((sum, skill) => sum + skill.xp, 0);
    const totalProgress = skills.reduce((sum, skill) => sum + skill.progress, 0);
    const averageProgress =
      totalSkills > 0 ? Math.round(totalProgress / totalSkills) : 0;
    const currentLevel = calculateCurrentLevel(totalXp);
    const xpProgress = calculateLevelProgress(totalXp);
    const recentSkills = [...skills]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 4);
    const activityDates = new Set(
      skills
        .map((skill) => getDateKey(skill.updatedAt || skill.createdAt))
        .filter(Boolean)
    );
    const weekStart = getStartOfWeek(new Date());
    const weekActivity = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      return activityDates.has(getDateKey(date));
    });
    let learningStreak = 0;
    const streakDate = new Date();

    while (activityDates.has(getDateKey(streakDate))) {
      learningStreak += 1;
      streakDate.setDate(streakDate.getDate() - 1);
    }

    return {
      totalSkills,
      completedSkills,
      inProgressSkills,
      totalXp,
      averageProgress,
      currentLevel,
      xpProgress,
      recentSkills,
      learningStreak,
      weekActivity,
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
    [skills, stats, categories, addSkill, updateSkill, deleteSkill]
  );

  return <SkillContext.Provider value={value}>{children}</SkillContext.Provider>;
}
