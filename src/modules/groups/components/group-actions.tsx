import { MoreHorizontalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
  ArrowUpRightIcon,
  CopyIcon,
  LinkIcon,
  NoteEditIcon,
  SidebarRightIcon,
  StarIcon,
  TrashIcon
} from "@/components/icons";

export const GroupActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="transition flex items-center ml-auto justify-center size-6 rounded-sm hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]">
          <MoreHorizontalIcon className="size-[18px] text-[#91918e]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[265px]" side="right" sideOffset={8}>
        <DropdownMenuItem>
          <StarIcon className="text-primary" />
          Add to Favorites
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LinkIcon className="text-primary" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyIcon className="text-primary" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NoteEditIcon className="text-primary" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem className="group focus:text-destructive">
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
        {/* <DropdownMenuSeparator />
        TODO: Edited by who */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}