import { useLocalStorage } from "react-use";

import { PageView } from "@/types/filter";

export const useView = () => {
  const [view, setView] = useLocalStorage<PageView>("view", PageView.SIDE);

  return { view, setView };
}