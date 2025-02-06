import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.groups["trash"][":id"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.groups["trash"][":id"]["$patch"]>;

export const useTrashGroup = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.groups["trash"][":id"]["$patch"]({ param });

      if (!response.ok) {
        throw new Error("Failed to trash group");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Group trashed", { id: "trash-group" });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => {
      toast.error("Failed to trash group", { id: "trash-group" });
    },
  });

  return mutation
}