import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";

interface GroupRenameProps {
  isOpen: boolean;
  height: number;
}

export const GroupRename = ({ isOpen, height }: GroupRenameProps) => {
  return (
    <Popover open={isOpen}>
      <PopoverContent className="fixed left-5 p-1.5 w-[380px]" style={{ top: `${height + 35}px` }}>
        Rename
      </PopoverContent>
    </Popover>
  );
}