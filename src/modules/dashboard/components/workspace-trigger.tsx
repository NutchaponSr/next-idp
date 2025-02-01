import { useRouter } from "next/navigation";
interface WorkspaceItemProps {
  children: React.ReactNode;
  href: string;
  label: string;
}

export const WorkspaceTrigger = ({
  children,
  href,
  label,
}: WorkspaceItemProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="flex items-center hover:bg-[#00000008] min-h-[30px] h-[30px] p-1 group/workspace"
    >
      {children}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
        {label}
      </div>
    </button>
  );
}