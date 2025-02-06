import { format } from "date-fns";
import { useCallback, useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger
} from "@/components/ui/tooltip";

import {
  ArrowUpRightIcon,
  CopyIcon,
  LinkIcon,
  NoteEditIcon,
  SidebarRightIcon,
  StarIcon,
  TrashIcon
} from "@/components/icons";

import { ResponseType } from "@/modules/groups/api/use-get-groups";
import { toast } from "sonner";
import { useTrashGroup } from "../api/use-trash-group";
import { GroupRename } from "./group-rename";

interface GroupActionsProps {
  group: ResponseType[0]
}

export const GroupActions = ({ group }: GroupActionsProps) => {
  const { mutate: trash } = useTrashGroup();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) setShowTooltip(false);
  }

  const onTrash = useCallback(() => {
    toast.loading("Trashing group...", { id: "trash-group" });
    trash({ 
      param: {
        id: group.id
      }
    });
  }, [group.id, trash]);

  const onCopy = () => {
    navigator.clipboard.writeText(`/groups/${group.id}`)
      .then(() => 
        toast.success("Copied link to cilpboard")
      );
  }

  return (
    <TooltipProvider>
      <Tooltip open={showTooltip} delayDuration={100}>
        <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <button 
                onMouseEnter={() => {if (!isOpen) setShowTooltip(true)}}
                onMouseLeave={() => setShowTooltip(false)}
                className="transition flex items-center ml-auto justify-center size-6 rounded-sm hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]"
              >
                <MoreHorizontalIcon className="size-[18px] text-[#91918e]" />
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={6} className="py-1 px-2">
            <p className="text-sm font-medium">
              Delete, duplicate and more...
            </p>  
          </TooltipContent>
          <DropdownMenuContent 
            side="right" 
            sideOffset={8}
            className="w-[265px]" 
            onClick={(e) => e.stopPropagation()} 
          >
            <DropdownMenuItem>
              <StarIcon className="text-primary" />
              Add to Favorites
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onCopy}>
              <LinkIcon className="text-primary" />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon className="text-primary" />
              Duplicate
            </DropdownMenuItem>
            <GroupRename>
              <DropdownMenuItem>
                <NoteEditIcon className="text-primary" />
                Rename
              </DropdownMenuItem>
            </GroupRename>
            <DropdownMenuItem onClick={onTrash} className="group focus:text-destructive">
              <TrashIcon className="text-primary group-focus:text-destructive transition-colors" />
              Move to Trash
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ArrowUpRightIcon className="text-primary" />
              Open in new tab
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SidebarRightIcon className="text-primary" />
              Open in side peek
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="p-1">
              <p className="text-xs text-[#37352f80]">Last edited by {group.updatedBy}</p>
              <p className="text-xs text-[#37352f80]">
                {format(group.updatedAt, "MMM d, y, p")}
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
}