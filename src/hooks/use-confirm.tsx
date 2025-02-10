import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const useConfirm = (props: {
  title?: string;
  description?: string;
  className?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const confirmStart = () => new Promise((resolve) => {
    setPromise({ resolve });
  });

  const handleClose = () => {
    setPromise(null);
  }

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  }

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  }

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent className={cn(props.className)}>
        <div className="text-center text-primary">
          {props.title?.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <div className="flex flex-col w-full space-y-1.5">
          <Button variant="destructive" onClick={handleConfirm} className="font-normal h-8">
            {props.confirmLabel}
          </Button>
          <Button variant="gray" onClick={handleCancel} className="font-normal h-8">
            {props.cancelLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirmStart]
}