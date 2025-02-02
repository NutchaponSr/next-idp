import { useGetGroups } from "../api/use-get-groups";

export const GroupList = () => {
  const { 
    data: groups,
    isPending: loadingGroups,
  } = useGetGroups();

  return (
    <pre className="flex items-center min-h-[30px] ml-9">
      
    </pre>
  );
}