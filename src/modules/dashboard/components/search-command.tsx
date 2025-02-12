import { 
  ArrowUpDownIcon, 
  CornerDownLeftIcon 
} from "lucide-react";
import { useToggle } from "react-use";

import { useSearchCategory } from "@/hooks/use-search-category";

import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { 
  FilterCircleIcon, 
  SearchIcon 
} from "@/components/icons";

import { SearchList } from "@/modules/dashboard/components/search-list";

import { useGetSearch } from "@/modules/dashboard/api/use-get-search";
import { useCurrentUser } from "@/modules/auth/hooks/use-current-user";
import { useSearchCommand } from "@/modules/dashboard/stores/use-search-command";
import { SearchFilters } from "./search-filters";

export const SearchCommand = () => {
  const currentUser = useCurrentUser();

  const { data } = useGetSearch({});
  const { isOpen, onClose } = useSearchCommand();

  const [on, toggle] = useToggle(false);

  const searchs = data?.data || [];

  const {
    searchQuery,
    setSearchQuery,
    filteredItem
  } = useSearchCategory(searchs, ["name"], "data");

  const name = currentUser?.name ?? "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[775px] min-h-[max(50vh,570px)] max-h-[max(50vh,570px)] p-0 flex flex-row justify-between">
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center px-4 w-full text-lg min-h-12 h-12 gap-x-3 shadow-[0_1px_rgba(55,53,47,0.09)]">
            <div className="flex items-center justify-center size-6 shrink-0 grow-0">
              <SearchIcon className="size-5 text-[#a4a4a2]" />
            </div>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search or ask a question in ${name}'s Jotion...`}
              className="w-full whitespace-nowrap text-ellipsis focus-visible:outline-none placeholder:text-[#a4a4a2] text-primary"
            />
            <div className="ml-auto flex items-center justify-center">
              <Button variant="ghost" size="lgIcon" onClick={toggle}>
                <FilterCircleIcon className="size-5 text-[#acaba9]" />
              </Button>
            </div>
          </div>
          <SearchFilters />
          <ScrollArea className="w-full h-full overflow-y-auto overflow-x-hidden">
            <SearchList searchs={filteredItem} />
          </ScrollArea>
          {/* 🦶🏼 Footer */}
          <div className="shadow-[0_-1px_0_rgba(55,53,47,0.09)] mt-[1px] flex flex-row justify-between items-center dark:shadow-[0_-1px_0_rgba(255,255,255,0.094)]">
            <div className="flex items-center w-full min-h-8 whitespace-nowrap overflow-hidden text-ellipsis">
              <div className="px-3 flex-auto">
                <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                  <ul className="whitespace-nowrap overflow-hidden text-ellipsis inline-flex items-center text-xs text-[#37352f80] dark:text-[#ffffff48] gap-5">
                    <li className="flex gap-1.5 items-center h-max">
                      <ArrowUpDownIcon className="size-3 text-[#9a9a97]" />
                      Select
                    </li>
                    <li className="flex gap-1.5 items-center h-max">
                      <CornerDownLeftIcon className="size-3 text-[#9a9a97]" />
                      Open
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}