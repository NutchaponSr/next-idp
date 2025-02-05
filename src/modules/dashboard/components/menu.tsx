import { CommandIcon } from "lucide-react";
import { JSX } from "react";

interface MenuProps {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  showBadge?: boolean;
}

export const Menu = ({
  icon,
  label,
  onClick,
  showBadge
}: MenuProps) => {
  return (
    <button onClick={onClick} className="hover:bg-[#00000008] min-h-[30px] transition duration-150 flex items-center p-1 group/sidebar">
      <div className="shrink-0 grow-0 rounded-sm size-6 flex justify-center items-center ml-1 mr-2">
        {icon}
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
        {label}
      </div>
      {showBadge && (
        <div className="ml-auto text-[10px] border font-mono tracking-tighter bg-[#efefed] py-0.5 px-1.5 rounded-sm group-hover/sidebar:bg-[#f7f7f5] flex items-center gap-1">
          <CommandIcon className="size-[10px] stroke-[1.75]" /> K
        </div>
      )}
    </button>
  );
}