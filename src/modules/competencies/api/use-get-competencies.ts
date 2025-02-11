import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export type ResponseType = InferResponseType<typeof client.api.competencies.$get, 200>["data"][0];

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