import { 
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth, 
  subDays, 
  subMonths
} from "date-fns";
import {  useState } from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { FilterButton } from "@/components/filter-button";
import { CalendarDaysIcon } from "./icons";
import { IconVariant } from "@/types/icon";
import { Calendar } from "./calendar";
import { Range } from "@/types/filter";

interface FilterCalendarProps {
  label: string;
  icon: React.ElementType;
  isFilter: boolean;
  onRange: (date: Date) => void;
  isInRange: (date: Date) => boolean;
  onClearDate: () => void;
  presets: {
    label: string;
    onClick: () => void;
  }[];
  ranges: Range;
  date: { start: Date | null; end: Date | null; };
}

export const FilterCalendar = ({ 
  date,
  ranges,
  onRange, 
  isInRange, 
  onClearDate,
  presets,
  ...props
}: FilterCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthEnd = endOfMonth(currentMonth);
  const monthStart = startOfMonth(currentMonth);

  const daysFromPrevMonth = monthStart.getDay();
  const prevMonthDays = daysFromPrevMonth > 0
    ? eachDayOfInterval({
        start: subDays(monthStart, daysFromPrevMonth),
        end: subDays(monthStart, 1)
      })
    : [];

  const currentMonthDays = eachDayOfInterval({ 
    start: monthStart, 
    end: monthEnd 
  });

  const totalDaysShown = 35; 
  const daysFromNextMonth = totalDaysShown - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = daysFromNextMonth > 0
    ? eachDayOfInterval({
        start: addDays(monthEnd, 1),
        end: addDays(monthEnd, daysFromNextMonth)
      })
    : [];

  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const formatDate = (date: Date) => {
    if (!date) return "";
    return format(date, "MMM yyyy");
  }

  return (
    <Popover>
      <PopoverTrigger>
        <FilterButton 
          {...props}
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-0">
        <div className="flex items-center justify-between text-left min-h-6 px-2 pt-2">
          <RangeDropdown ranges={ranges.ranges} label={ranges.label} />
          <Button variant="ghost" size="xs" onClick={onClearDate} className="text-[#37352fa6] hover:text-[#37352fa6]">
            Clear
          </Button>
        </div>
        <div className="my-2 shadow-[0_1px_0_rgba(55,53,47,0.09)] pb-2">
          <div className="flex flex-col p-1 gap-px">
            {presets.map((set) => (
              <Button variant="ghost" size="sm" key={set.label} onClick={set.onClick} className="text-primary hover:text-primary w-full justify-start">
                <CalendarDaysIcon variant={IconVariant.SOLID} className="size-4 fill-primary" />
                {set.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-left min-h-6 px-3">
          <h2 className="text-sm text-primary">{formatDate(currentMonth)}</h2>
          <div>
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeftIcon className="text-[#37352fd9] size-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRightIcon className="text-[#37352fd9] size-4" />
            </Button>
          </div>
        </div>
        <Calendar 
          date={date}
          days={allDays}
          onRange={onRange}
          isInRange={isInRange}
          currentMonth={currentMonth}
        />
      </PopoverContent>
    </Popover>
  );
}

const RangeDropdown = ({
  label,
  ranges
}: Range) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="xs" className="text-[#37352fa6] hover:text-[#37352fa6] gap-1">
          {label}
          <ChevronDownIcon className="size-3 text-[#37352f59]" /> 
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {ranges.map((item) => (
          <DropdownMenuItem key={item.label} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}