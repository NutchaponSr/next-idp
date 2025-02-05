import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<typeof client.api.groups.$get, 200>["data"];

export const useGetGroups = () => {
  const query = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await client.api.groups.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
}