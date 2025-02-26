import React from "react";

import { useView } from "@/stores/use-view";

import { pageViews } from "@/constants/filters";


interface PanelButtonProps<T extends object> {
  data: T;
}

export const PanelButton = <T extends object>({ data }: PanelButtonProps<T>) => {
  const { view } = useView();

  return (
    <div className="flex bg-background p-0.5 h-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08),0_0_0_1px_rgba(84,72,49,0.08)] rounded-sm sticky right-1">
      <button className="transition flex items-center justify-center whitespace-nowrap rounded-sm h-5 px-1 text-xs font-medium text-[#37352fa6] uppercase tracking-[0.5px] hover:bg-[#efefee]" onClick={() => console.log(data)}>
        {React.createElement(pageViews[view].icon, { className: "size-4 text-[#737373] shrink-0 mr-1" })}
        Open
      </button>
    </div>
  );
}