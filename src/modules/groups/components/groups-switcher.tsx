import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { CalendarDayIcon } from "@/components/icons";
import { WorkspaceIcon } from "@/modules/dashboard/components/workspace-icon";
import { ChevronsUpDown } from "lucide-react";

interface GroupSwitcherProps {
  currentYear: number;
  selectedYear: number;
  onSelect: (year: number) => void;
}

export const GroupSwitcher = ({
  currentYear,
  selectedYear,
  onSelect
}: GroupSwitcherProps) => {
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-start hover:bg-[#00000008] min-h-[26px] h-[26px] p-1 w-full shadow-[0_0_0_1px_rgba(15,15,15,0.1)] rounded-md bg-white text-xs ml-6">
          <WorkspaceIcon icon={CalendarDayIcon} size="sm" />
          {selectedYear}
          <ChevronsUpDown className="ml-auto size-[14px]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {years.map((year) => (
          <DropdownMenuItem key={year} onSelect={() => onSelect(year)} className="h-6 text-xs">
            {year}
            {year === currentYear && <span className="font-semibold">(Current year)</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}