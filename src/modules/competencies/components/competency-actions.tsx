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
  TooltipProvider,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

import {
  ArrowUpRightIcon,
  CopyIcon,
  LinkIcon,
  NoteEditIcon,
  SidebarRightIcon,
  TrashIcon
} from "@/components/icons";

import { ResponseType } from "@/modules/competencies/api/use-get-competencies";
import { useTrashCompetency } from "@/modules/competencies/api/use-trash-competency";
import { useDuplicateCompetency } from "@/modules/competencies/api/use-duplicate-competency";

interface CompetencyActionsProps {
  competency: ResponseType;
  onRename: () => void;
}

export const CompetencyActions = ({ competency, onRename }: CompetencyActionsProps) => {
  const { mutate: trash } = useTrashCompetency();
  const { mutate: duplicate } = useDuplicateCompetency();

  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/competencies/${competency.id }`;
  
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
    toast.loading("Trashing competency...", { id: "trash-competency" });
    trash({ 
      param: {
        id: competency.id
      }
    });
  }, [competency.id, trash]);

  const onDuplicate = useCallback(() => {
    toast.loading("Duplicating group...", { id: "duplicate-competency" });
    duplicate({ param: { id: competency.id } });
  }, [competency.id, duplicate]);

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
            <div className="p-1">
              <p className="text-xs text-[#37352f80]">Last edited by {competency.updatedBy}</p>
              <p className="text-xs text-[#37352f80]">
                {format(competency.updatedAt, "MMM d, y, p")}
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
}