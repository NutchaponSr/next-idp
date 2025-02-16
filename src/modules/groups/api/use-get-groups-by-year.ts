import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export type ResponseType = InferResponseType<typeof client.api.groups[":year"]["$get"], 200>["data"][0];

export const useGetGroupsByYear = (year: string) => {
  const query = useQuery({
    enabled: !!year,
    queryKey: ["groups", { year }],
    queryFn: async () => {
      const response = await client.api.groups[":year"]["$get"]({ param: { year } });

      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
}