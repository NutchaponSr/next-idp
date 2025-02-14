import { 
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth, 
  subDays, 
  subMonths
} from "date-fns";
import { JSX, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { FilterButton } from "@/components/filter-button";

interface FilterCalendarProps {
  label: string;
  icon: React.ElementType;
  isFilter: boolean;
  onRange: (date: Date) => void;
  isInRange: (date: Date) => boolean;
  onClearDate: () => void;
  date: { start: Date | null; end: Date | null; };
}

export const FilterCalendar = ({ 
  date,
  onRange, 
  isInRange, 
  onClearDate,
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

  const renderCalendarDays = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const days: JSX.Element[] = [];

    weekdays.forEach((day) => {
      days.push(
        <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
          {day}
        </div>
      );
    });

    allDays.forEach(day => {
      const isSelected = date.start && (
        isSameDay(day, date.start) || 
        (date.end && isSameDay(day, date.end))
      );

      days.push(
        <button
          key={day.toISOString()}
          onClick={() => onRange(day)}
          className={cn(
            "size-8 text-sm transition text-primary flex items-center justify-center relative rounded-[2px] hover:ring-[1.5px] hover:ring-[#2383e280]",
            isSelected && "bg-[#2383e2] text-white hover:bg-[#2383e2]",
            isInRange(day) && !isSelected && "bg-[#ebf5fe] text-[#2383e2]",
            isToday(day) && !isSelected && "ring-[1.5px] ring-[#2383e280] font-semibold text-[#2383e2]",
            !isSameMonth(day, currentMonth) && "text-gray-300",
          )}
        >
          {format(day, "d")}
        </button>
      );
    });

    return days
  } 

  return (
    <Popover>
      <PopoverTrigger>
        <FilterButton 
          {...props}
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-2">
        <div className="flex items-center justify-between text-left min-h-6 px-1">
          <div />
          <Button variant="ghost" size="xs" onClick={onClearDate} className="text-[#37352f80] hover:text-[#37352f80]">
            clear
          </Button>
        </div>
        <div className="flex items-center justify-between text-left min-h-6 px-1">
          <h2 className="text-sm text-primary font-semibold">{formatDate(currentMonth)}</h2>
          <div>
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeftIcon className="text-[#37352fd9] size-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRightIcon className="text-[#37352fd9] size-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
      </PopoverContent>
    </Popover>
  );
}