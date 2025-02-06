import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

interface GroupRenameProps {
  children: React.ReactNode;
}

export const GroupRename = ({ children }: GroupRenameProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent>
        Rename
      </PopoverContent>
    </Popover>
  );
}