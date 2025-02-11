import { Notebook2Icon } from "@/components/icons";
import { headers } from "@/constants/competencies";

import { SidebarItem } from "@/modules/dashboard/components/sidebar-item";
import { useCreateCompetency } from "../api/use-create-competency";
import { Hint } from "@/components/hint";
import { typesCompetency } from "@/db/schema";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { useGetCompetencies } from "../api/use-get-competencies";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebarToggle } from "@/modules/dashboard/stores/use-sidebar-toggle";
import { CompetencyType } from "@/types/competency";
import { getEmojiForType } from "@/lib/utils";
import { CompetencyActions } from "./competency-actions";

export const CompetencySpace = () => {
  const {
    data: competencies,
    isLoading: loadingCompetencies,
  } = useGetCompetencies();
  const { mutate } = useCreateCompetency();
  const { on, toggle } = useSidebarToggle();

  const onCreate = (type: CompetencyType) => {
    toast.loading("Creating competency...", { id: "create-competency" });
    mutate({
      json: {
        pl1: null,
        pl2: null,
        pl3: null,
        pl4: null,
        pl5: null,
        definition: null,
        name: "Untitled",
        icon: getEmojiForType(type),
        type: type as typeof typesCompetency.enumValues[number],
      }
    });
  }

  if (loadingCompetencies) {
    return (
      Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="flex items-center min-h-[30px] p-1">
          <SidebarItem.Skeleton key={i} />
          <Skeleton className="h-2.5 w-full rounded-full mr-1" />
        </div>
      ))
    );
  }

  return (
    headers.map((header) => {
      const initialCompetencies = competencies?.filter((competency) => competency.type === header.type) || [];

      return (
        <SidebarItem 
          key={header.type}
          label={header.title}
          indent="pl-3"
          href={`/competencies?type=${header.type}`}
          icon={Notebook2Icon}
          variant={header.variant}
          isOpen={on[header.type]}
          background={header.background}
          onToggle={() => toggle(header.type)}
          actions={
            <Hint label="Create a new group" side="right" sideOffset={6}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onCreate(header.type)
                }} 
                className="transition flex items-center ml-auto justify-center size-6 rounded-sm hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]"
              >
                <PlusIcon className="size-[18px] text-[#91918e]" />
              </button>
            </Hint>
          }
        >
          {initialCompetencies.length ? (
            initialCompetencies.map((competency) => (
              <SidebarItem 
                key={competency.id}
                label={competency.name}
                indent="pl-5"
                href={`/competencies/${competency.id}`}
                trigger={competency.icon}
                background="none"
                actions={<CompetencyActions />}
              />
            ))
          ) : (
            <div className="flex items-center min-h-[30px] p-1 pl-5 w-full text-sm">
              Not found result
            </div>
          )}
        </SidebarItem>
      );
    })
  );
}