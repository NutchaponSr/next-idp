import { toast } from "sonner";
import { CornerUpLeftIcon } from "lucide-react";

import { TrashCategory } from "@/types/trash";
import { useConfirm } from "@/hooks/use-confirm";

import { Button } from "@/components/ui/button";

import { Hint } from "@/components/hint";
import { Separator } from "@/components/ui/separator";

import { 
  HashIcon, 
  TrashIcon 
} from "@/components/icons";

import { useDeleteTrash } from "@/modules/dashboard/api/use-delete-trash";
import { useRestoreTrash } from "@/modules/dashboard/api/use-restore-trash";

interface TrashItemProps {
  id: string;
  name: string;
  icon: string | null;
  description: string;
  variant: TrashCategory;
}

export const TrashItem = ({
  id,
  name,
  icon,
  description,
  variant
}: TrashItemProps) => {
  const { 
    mutate: deleteTrash, 
    isPending: isDeleting
  } = useDeleteTrash();
  const {
    mutate: restoreTrash,
    isPending: isRestoring 
  } = useRestoreTrash();

  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure you want to delete \n this stuff from Trash?",
    description: "",
    className: "w-[300px]",
    confirmLabel: "Yes. Delete this stuff",
    cancelLabel: "Cancel",
  });

  const isPending = isDeleting || isRestoring;

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      toast.loading("Deleting...", { id: "delete-trash" });
      deleteTrash({
        param: { id }, 
        json: { variant }
      });
    }
  }

  const onRestore = () => {
    toast.loading("Restoring...", { id: "restore-trash" });
    restoreTrash({
      param: { id },
      json: { variant }
    });
  }

  return (
    <div className="rounded-sm hover:bg-[#37352f0f] transition">
      <ConfirmDialog />
      <div className="flex items-center w-full min-h-7 h-7 text-sm py-1">
        <div className="flex items-center justify-center ml-2.5 mr-1">
          <div className="flex items-center justify-center size-5 shrink-0 text-base">
            {icon ? icon : <HashIcon className="size-[18px] text-[#91918e]" />}
          </div>
        </div>
        <div className="flex-auto mx-1.5">
          <div className="flex flex-row space-x-1 items-center">
            <h2 className="whitespace-nowrap overflow-hidden text-ellipsis text-[#37352f] dark:text-[#ffffffcf] text-sm">
              {name}
            </h2>
            <Separator className="w-3 h-[1px] bg-[#37352f80] dark:bg-[#ffffff71]" />
            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-[#37352f80] dark:text-[#ffffff71] text-xs">
              {description}
            </p>
          </div>
        </div>
        <div className="ml-auto mr-2.5">
          <div className="flex gap-1">
            <Hint label="Restore" side="bottom" sideOffset={8}>
              <Button onClick={onRestore} size="icon" variant="ghost" className="size-6 hover:bg-[#37352f0f] rounded-sm" disabled={isPending}>
                <CornerUpLeftIcon className="size-4 text-[#a4a4a2] dark:text-[#8C8C8C] stroke-[1.7]" />
              </Button>
            </Hint>
            <Hint label="Delete from Trash" side="bottom" sideOffset={8}>
              <Button onClick={onDelete} size="icon" variant="ghost" className="size-6 hover:bg-[#37352f0f] rounded-sm" disabled={isPending}>
                <TrashIcon className="size-4 text-[#a4a4a2] dark:text-[#8C8C8C]"  />
              </Button>
            </Hint>
          </div>
        </div>
      </div>
    </div>
  );
}