import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { useSearchCommand } from "@/modules/dashboard/stores/use-search-command";

export type ResponseType = InferResponseType<typeof client.api.search.$get, 200>["data"];

export const useGetSearch = ({ 
  search,
  sort, 
}: { 
  search?: string
  sort?: string
}) => {
  const { isOpen } = useSearchCommand();

  const query = useQuery({
    enabled: isOpen,
    queryKey: ["search", { search, sort }],
    queryFn: async () => {
      const response = await client.api.search.$get({
        query: {
          sort,
          search,
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch search");
      }

      const data = await response.json();
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return query;
}