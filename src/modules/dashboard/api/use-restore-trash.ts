import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.trashs[":id"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.trashs[":id"]["$patch"]>;

export const useRestoreTrash = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.trashs[":id"]["$patch"]({
        param,
        json
      });

      if (!response.ok) {
        throw new Error("Failed to restore");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Restored successful", { id: "restore-trash" });

      queryClient.invalidateQueries({ queryKey: ["trashs"] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["competencies"] });
    },
    onError: () => {
      toast.error("Failed to restore", { id: "restore-trash" });
    }
  });

  return mutate;
}