import { useContext } from "react";
import { SkillContext } from "../context/SkillContext.jsx";

export default function useSkills() {
  const context = useContext(SkillContext);

  if (!context) {
    throw new Error("useSkills must be used within a SkillProvider");
  }

  return context;
}
