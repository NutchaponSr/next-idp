import { CornerDownRight, PlusCircleIcon } from "lucide-react";
import { GroupSwitcher } from "./groups-switcher";
import { useCreateGroup } from "../api/use-create-group";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const GroupMenuBar = () => {
  const { mutate: createGroup } = useCreateGroup();

  const currentYear = new Date().getFullYear();
  
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const onCreate = useCallback(() => {
    toast.loading("Creating group...", { id: "create-group" });
    createGroup({
      json: {
        name: null,
        icon: null,
        year: selectedYear.toString(),
      }
    })
  }, [createGroup, selectedYear]);
  
  return (
    <div className="flex items-center min-h-[30px] ml-3 relative">
      <CornerDownRight className="size-4 absolute top-1.5" />
      <div className="flex items-center gap-1 w-full mr-1">
        <GroupSwitcher 
          onSelect={(year: number) => setSelectedYear(year)}
          selectedYear={selectedYear}
          currentYear={currentYear}
        />
        <button 
          onClick={onCreate}
          className="min-h-[26px] h-[26px] min-w-[26px] w-[26px] flex items-center justify-center hover:bg-[#00000008] shadow-[0_0_0_1px_rgba(15,15,15,0.1)] bg-white rounded-md"
        >
          <PlusCircleIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}