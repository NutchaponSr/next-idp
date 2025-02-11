import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { FilterButton } from "./filter-button";
import { FilterData } from "@/types/filter";
import { CheckIcon } from "lucide-react";
import { IconVariant } from "@/types/icon";
import { UserAvatar } from "@/modules/auth/components/user-avatar";
import { useState } from "react";

interface FilterCommandProps {
  data: FilterData;
  label: string;
  icon: React.ElementType;
  onSelect: (value: string[]) => void
}

export const FilterCommand = ({ data, label, icon, onSelect }: FilterCommandProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <Popover>
      <PopoverTrigger>
        <FilterButton label={label} icon={icon} />
      </PopoverTrigger>
      <PopoverContent className="p-0 w-60" align="start">
        <Command>
          <CommandInput placeholder={""} />
          <CommandList>
            <CommandEmpty>No result found</CommandEmpty>
            <CommandGroup>
              {data.map((item, index) => (
                <CommandItem
                  key={index}
                  className="space-x-2"
                  onSelect={() => {
                    const newSelection = selectedValues.includes(item.id)
                      ? selectedValues.filter((v) => v !== item.id)
                      : [...selectedValues, item.id]; 

                    setSelectedValues(newSelection); 
                    onSelect(newSelection); 
                  }}
                >
                  {item.icon ? (
                    <div className="flex items-center justify-center size-5 shrink-0 text-base">
                      <item.icon variant={IconVariant.BULK} fill="#91918e" />
                    </div>
                  ) : (
                    <UserAvatar
                      name={item.label}
                      imageUrl={item.header ?? ""}
                      className="size-5"
                      fallbackClassName="size-5 bg-blue-500 text-white text-xs"
                    />
                  )}
                  <div className="flex-auto whitespace-nowrap text-ellipsis overflow-hidden">
                    {item.label}
                  </div>
                  {selectedValues.includes(item.id) && <CheckIcon className="ml-auto size-3" />} 
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}