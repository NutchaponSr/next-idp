import { atom, useAtom } from "jotai";

import { WorkspaceKey } from "@/types/workspace";

const workspaceOpenAtom = atom<Record<WorkspaceKey, boolean>>({
  GROUP: false,
  COMPETENCY: false,
  YEAR: false,
});

export const useToggle = () => {
  const [on, setOn] = useAtom(workspaceOpenAtom);
  
  const toggle = (key: WorkspaceKey) => {
    setOn((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  const isOpen = (key: WorkspaceKey) => on[key];

  return { isOpen, toggle };
}