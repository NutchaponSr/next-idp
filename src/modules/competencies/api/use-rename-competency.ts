import { toast } from "sonner";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.competencies["rename"][":id"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.competencies["rename"][":id"]["$patch"]>;


export const useRenameCompetency = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.competencies["rename"][":id"]["$patch"]({
        param,
        json
      });

      if (!response.ok) {
        throw new Error("Failed to rename competency");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Competency renamed", { id: "rename-competency" });
      queryClient.invalidateQueries({ queryKey: ["competencies"] });
    },
    onError: () => {
      toast.error("Failed to rename competency", { id: "rename-competency" });
    },
  });

  return mutate;
}