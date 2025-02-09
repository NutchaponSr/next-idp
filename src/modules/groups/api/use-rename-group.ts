import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.groups["rename"][":id"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.groups["rename"][":id"]["$patch"]>;

export const useRenameGroup = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.groups["rename"][":id"]["$patch"]({
        param: {
          id: param.id
        },
        json: {
          name: json.name,
          icon: json.icon,
        }
      });

      if (!response.ok) {
        throw new Error("Failed to rename group");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Group renamed", { id: "rename-group" });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => {
      toast.error("Failed to rename group", { id: "rename-group" });
    },
  });

  return mutation
}