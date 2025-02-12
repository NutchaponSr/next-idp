import { useCallback, useEffect } from "react";

type KeyboardType = {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  fn: () => void; 
} 

export const useKeyboard = (shortcuts: KeyboardType[]) => {
  const handleKey = useCallback((event: KeyboardEvent) => {
    shortcuts.forEach(shortcuts => {
      const isCtrl = shortcuts.ctrl ? (event.ctrlKey || event.metaKey) : true;
      const isMeta = shortcuts.meta ? event.metaKey : true;

      if (isCtrl && isMeta && event.key === shortcuts.key) {
        event.preventDefault();
        shortcuts.fn();
      }
    });
  }, [shortcuts])

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return (() => {
      document.removeEventListener("keydown", handleKey);
    })
  }, [handleKey]);
}