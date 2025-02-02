import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.groups.$post>;
type ResponseType = InferResponseType<typeof client.api.groups.$post>;

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.groups.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to create group");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Group created", { id: "create-group" });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => {
      toast.error("Failed to create group", { id: "create-group" });
    },
  });

  return mutation
}