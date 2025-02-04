import { atom, useAtom } from "jotai";

const groupYearAtom = atom<Record<number, boolean>>({});

export const useGroupYear = () => {
  const [on, setOn] = useAtom(groupYearAtom);

  const toggle = (id: number) => {
    setOn((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return { on, toggle };
}