import { 
  format,
  isSameDay, 
  isSameMonth, 
  isToday 
} from "date-fns";

import { cn } from "@/lib/utils";
import { DateRange } from "@/types/filter";

interface CalendarProps {
  days: Date[];
  date: DateRange
  currentMonth: Date;
  onRange: (date: Date) => void;
  isInRange: (date: Date) => boolean;
}

export const Calendar = ({
  days,
  date,
  currentMonth,
  onRange,
  isInRange
}: CalendarProps) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="grid grid-cols-7 gap-1 p-2">
      {weekdays.map((day) => (
        <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
          {day}
        </div>
      ))}
      {days.map((day) => {
        const isSelected = date.start && (
          isSameDay(day, date.start) || (date.end && isSameDay(day, date.end))
        );

        return (
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
      })}
    </div>
  );
}