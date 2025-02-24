import { TrashIcon } from "@/components/icons";
import { MoreHorizontalIcon } from "lucide-react";

export const groupMenus = [
  {
    icon: <TrashIcon className="size-4 text-primary group-hover:text-destructive" />,
    className: "group hover:bg-[#37352f0f] w-7 flex items-center justify-center",
  },
  {
    icon: <MoreHorizontalIcon className="size-4 text-primary stroke-[1.7]" />,
    className: "hover:text-destructive hover:bg-[#37352f0f] w-7 flex items-center justify-center",
  },
]