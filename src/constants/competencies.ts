import { CompetencyType } from "@/types/competency";

interface HeaderType  {
  title: string;
  type: CompetencyType;
  variant: "default" | "pink" | "orange" | "red" | "blue" | "green";
  background: "default" | "pink" | "orange" | "red" | "blue" | "green";
}

export const headers: HeaderType[] = [
  {
    title: "Core",
    type: CompetencyType.CC,
    variant: "red",
    background: "red",
  },
  {
    title: "Functional",
    type: CompetencyType.FC,
    variant: "blue",
    background: "blue",
  },
  {
    title: "Technical",
    type: CompetencyType.TC,
    variant: "green",
    background: "green",
  },
]