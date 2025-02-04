import { atom, useAtom } from "jotai";

const groupItemAtom = atom<Record<string, boolean>>({});

export const useGroupItem = () => {
  const [on, setOn] = useAtom(groupItemAtom);

  const toggle = (id: string) => {
    setOn((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return { on, toggle };
}