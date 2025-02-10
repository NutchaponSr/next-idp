import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.groups["duplicate"][":id"]["$post"]>;
type ResponseType = InferResponseType<typeof client.api.groups["duplicate"][":id"]["$post"]>;

export const useDuplicateGroup = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.groups["duplicate"][":id"]["$post"]({ param });

      if (!response.ok) {
        throw new Error("Failed to duplicate group");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Group duplicated", { id: "duplicate-group" });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => {
      toast.error("Failed to duplicate group", { id: "duplicate-group" });
    },
  });

  return mutation
}