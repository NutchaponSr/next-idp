import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.trashs["bulk-delete"]["$post"]>;

export const useDeleteBulkTrash = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.trashs["bulk-delete"]["$post"]();

      if (!response.ok) {
        throw new Error("Failed to delete all");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Deleted successful", { id: "delete-bulk-trash" });

      queryClient.invalidateQueries({ queryKey: ["trashs"], exact: true });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["competencies"] });
    },
    onError: () => {
      toast.error("Failed to delete all", { id: "delete-bulk-trash" });
    }
  });

  return mutate;
}