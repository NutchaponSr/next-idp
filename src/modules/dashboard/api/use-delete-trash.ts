import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.trashs[":id"]["$delete"]>;
type ResponseType = InferResponseType<typeof client.api.trashs[":id"]["$delete"]>;

export const useDeleteTrash = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.trashs[":id"]["$delete"]({
        param,
        json
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Deleted successful", { id: "delete-trash" });

      queryClient.invalidateQueries({ queryKey: ["trashs"], exact: true });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["competencies"] });
    },
    onError: () => {
      toast.error("Failed to delete", { id: "delete-trash" });
    }
  });

  return mutate;
}