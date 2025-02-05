import { atom, useAtom } from "jotai";

const toggleAtom = atom<Record<string, boolean>>({});

export const useSidebarToggle = () => {
  const [on, setOn] = useAtom(toggleAtom);

  const toggle = (key: string) => {
    setOn((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return { on, toggle };
};
