import { atom, useAtom } from "jotai";

const groupItemAtom = atom<Record<string, boolean>>({});

export const useGroupItem = () => {
  const [isOpen, setIsOpen] = useAtom(groupItemAtom);

  const onToggle = (id: string) => {
    setIsOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return { isOpen, onToggle };
}