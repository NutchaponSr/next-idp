import { cn } from "@/lib/utils";
import { groupMenus } from "@/constants/groups";

interface SelectMenuProps<T extends object> {
  selectedData: T[];
}

export const SelectMenu = <T extends object>({ selectedData }: SelectMenuProps<T>) => {
  return (
    <div className={cn(
      "sticky left-0 top-0 z-[100] transition-all duration-300 ease-in-out",
      selectedData.length > 0 
        ? "visible translate-y-0"
        : "hidden -translate-y-2"
    )}> 
      <div className="absolute top-0 left-24 inline-flex justify-center items-center rounded-sm bg-white h-8 shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_2px_4px]">
        <button className="text-marine hover:text-marine hover:bg-[#37352f0f] font-normal text-sm rounded-l-sm px-2.5 h-full shadow-[rgba(55,53,47,0.09)_1px_0px_0px]">
          {selectedData.length + " Selected"}
        </button>
        {groupMenus.map((btn, index) => (
          <button
            key={index}
            className={cn(
              "font-normal text-sm h-full shadow-[rgba(55,53,47,0.09)_1px_0px_0px] transition-colors",
              btn.className,
              index === groupMenus.length - 1 && "rounded-r-sm"
            )}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </div>
  );
}