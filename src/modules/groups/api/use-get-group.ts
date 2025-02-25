import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export type ResponseType = InferResponseType<typeof client.api.groups[":id"]["$get"], 200>["data"];

export const useGetGroup = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await client.api.groups[":id"]["$get"]({ param: { id } });

      if (!response.ok) {
        throw new Error("Failed to fetch group");
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
}