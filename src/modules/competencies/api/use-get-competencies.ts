import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetCompetencies = () => {
  const query = useQuery({
    queryKey: ["competencies"],
    queryFn: async () => {
      const response = await client.api.competencies.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch competencies");
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
}