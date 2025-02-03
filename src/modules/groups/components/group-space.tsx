import { CornerDownRight, PlusCircleIcon } from "lucide-react";
import { GroupSwitcher } from "./groups-switcher";
import { useCreateGroup } from "../api/use-create-group";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { GroupList } from "./group-list";
import { useGetGroups } from "../api/use-get-groups";
import { Hint } from "@/components/hint";

export const GroupSpace = () => {
  const { 
    data: groups,
    isPending: loadingGroups,
  } = useGetGroups();
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

  const initialGroups = groups?.filter((group) => group.year === selectedYear.toString()) || [];
  
  // TODO: Loading
  if (loadingGroups) {
    return (
      <div>
        loading
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center min-h-[30px] ml-3 relative">
        <CornerDownRight className="size-4 absolute top-1.5 text-[#A4A4A2]" />
        <div className="flex items-center gap-1 w-full mr-1">
          <GroupSwitcher 
            onSelect={(year: number) => setSelectedYear(year)}
            selectedYear={selectedYear}
            currentYear={currentYear}
          />
          <Hint label="Create a new group" side="right" sideOffset={6}>
            <button 
              onClick={onCreate}
              className="min-h-[26px] h-[26px] min-w-[26px] w-[26px] flex items-center justify-center hover:bg-[#00000008] shadow-[0_0_0_1px_rgba(15,15,15,0.1)] bg-white rounded-md"
            >
              <PlusCircleIcon className="size-4" />
            </button>
          </Hint>
        </div>
      </div>
      <GroupList initialData={initialGroups} />
    </div>
  );
}