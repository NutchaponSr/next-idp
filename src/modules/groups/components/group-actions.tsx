import { toast } from "sonner";
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
import { useTrashGroup } from "@/modules/groups/api/use-trash-group";
import { useDuplicateGroup } from "@/modules/groups/api/use-duplicate-group";

interface GroupActionsProps {
  group: ResponseType;
  onRename: () => void;
}

export const GroupActions = ({ group, onRename }: GroupActionsProps) => {
  const { mutate: trash } = useTrashGroup();
  const { mutate: duplicate } = useDuplicateGroup();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/groups/${group.id}`;

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) setShowTooltip(false);
  }

  const onCopy = () => {
    navigator.clipboard.writeText(baseUrl)
      .then(() => 
        toast.success("Copied link to cilpboard")
      );
  }

  const onNewTab = () => {
    if (typeof window !== "undefined") {
      window.open(baseUrl, "_blank");
    }
  }

  const onTrash = useCallback(() => {
    toast.loading("Trashing group...", { id: "trash-group" });
    trash({ 
      param: {
        id: group.id
      }
    });
  }, [group.id, trash]);

  const onDuplicate = () => {
    toast.loading("Duplicating group...", { id: "duplicate-group" });
    duplicate({ param: { id: group.id } });
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
            <DropdownMenuItem onClick={onDuplicate}>
              <CopyIcon className="text-primary" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRename}>
              <NoteEditIcon className="text-primary" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onTrash} className="group focus:text-destructive">
              <TrashIcon className="text-primary group-focus:text-destructive transition-colors" />
              Move to Trash
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onNewTab}>
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