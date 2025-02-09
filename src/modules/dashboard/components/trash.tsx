import { useToggle } from "react-use";

import { FilterVariant } from "@/types/filter";
import { sidebarIconProps } from "@/types/icon";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { 
  File1Icon,
  FolderLibraryIcon, 
  Notebook1Icon, 
  TrashIcon, 
  UserIcon 
} from "@/components/icons";
import { Hint } from "@/components/hint";
import { Filter } from "@/components/filter";

import { TrashItem } from "@/modules/dashboard/components/trash-item";

import { useGetTrashs } from "@/modules/dashboard/api/use-get-trashs";
import { useSearch } from "@/hooks/use-search";

export const Trash = () => {
  const [on, toggle] = useToggle(false);
  
  const { 
    data: queryData, 
    isLoading: loadingTrashs 
  } = useGetTrashs(on);

  const trashs = queryData?.data.populatedData || [];
  const updatedBy = queryData?.data.updatedPeoples || [];

  const {
    searchQuery,
    setSearchQuery,
    filteredItems
  } = useSearch(trashs || [], ["name"]);
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button onClick={toggle} className="hover:bg-[#00000008] min-h-[30px] transition duration-150 flex items-center p-1 group/sidebar">
          <div className="shrink-0 grow-0 rounded-sm size-6 flex justify-center items-center ml-1 mr-2">
            <TrashIcon {...sidebarIconProps} />
          </div>
          <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
            Trash
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent side="right" sideOffset={6} className="w-[414px] h-[40vh] max-h-[70vh] p-0">
        <div className="flex flex-col h-full">
          <div className="shrink-0 space-y-2.5">
            <div className="flex items-center w-full min-h-7 p-2">
              <input 
                type="text"
                value={searchQuery}
                placeholder="Search stuff in Trash"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-sm shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f] placeholder:text-[#91918e] font-light dark:bg-[#ffffff0e] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075)] dark:text-[#ffffffcf] focus-within:shadow-[inset_0_0_0_1px_rgba(35,131,226,0.57),0_0_0_2px_rgba(35,131,226,0.35)]"
              />
            </div>
          </div>
          <div className="flex flex-row space-x-1.5 px-2">
            <Filter 
              data={updatedBy}
              label="Created By"
              icon={UserIcon}
              variant={FilterVariant.COMMAND} 
            />
            <Filter 
              data={[
                { label: "Group", icon: FolderLibraryIcon },
                { label: "Competency", icon: Notebook1Icon },
              ]}
              label="In"
              icon={File1Icon}
              variant={FilterVariant.COMMAND} 
            />
          </div>
          <div className="grow overflow-x-hidden overflow-y-auto custom-scrollbar">
            <div className="p-2 h-full">
              {loadingTrashs ? (
                <div className="flex flex-col items-center justify-center h-full space-y-2">
                  <TrashIcon className="text-[#c7c9c4] size-9" />
                  <span className="text-sm font-semibold text-[#787774]">
                    Trash stuff appear here
                  </span>
                </div>
              ) : (
                filteredItems.length ? (
                  filteredItems.map((trash) => (
                    <TrashItem 
                      key={trash.id}
                      id={trash.id}
                      name={trash.name}
                      icon={trash.icon}
                      description={trash.description}
                      variant={trash.type}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full space-y-2">
                    <TrashIcon className="text-[#c7c9c4] size-9" />
                    <span className="text-sm font-semibold text-[#787774]">
                      No result
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="p-2 bg-[#2383e212] shadow-[0_-1px_0_rgba(55,53,47,0.09)] rounded-b-md px-2 flex items-center justify-between">
            <p className="text-xs text-[#37352fa6] dark:text-[#ffffff71]">Pages in Trash for over 30 days will be automatically deleted</p>
            <Hint label="Delete all">
              <Button variant="outline" size="icon">
                <TrashIcon className="text-[#91918e] size-4" />
              </Button>
            </Hint>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}