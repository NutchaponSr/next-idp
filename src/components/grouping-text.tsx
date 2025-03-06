import { ColumnProps } from "@/types/filter";

import { grouping } from "@/constants/filters";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { MoreButton } from "@/components/more-button";
import { useTable } from "@/stores/use-table";
import { Check1Icon } from "./icons";

interface GroupingTextProps<T extends object> {
  column: ColumnProps<T>;
}

export const GroupingText = <T extends object>({ column }: GroupingTextProps<T>) => {
  const { groupOption, setGroupOption } = useTable();

  return (
    <>
      {grouping.TEXT.content.map((item) => {
        const selectedValue = groupOption[item.label]?.value; 

        return (
          <DropdownMenu key={item.label}>
            <DropdownMenuTrigger className="w-full flex justify-start">
              <MoreButton 
                label={item.label} 
                description={groupOption[item.label]?.label || "None"} 
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={8}>
              {Object.values(item.method).map((option) => (
                <DropdownMenuItem 
                  key={option.value} 
                  onClick={() => setGroupOption({ ...groupOption, [item.label]: option })}
                >
                  {option.label}
                  {selectedValue === option.value && <Check1Icon className="size-4 ml-auto" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </>
  );
}