import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.competencies.$post>;
type ResponseType = InferResponseType<typeof client.api.competencies.$post>;

export const useCreateCompetency = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.competencies.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to create competency");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Competency created", { id: "create-competency" });
      queryClient.invalidateQueries({ queryKey: ["competencies"] });
    },
    onError: () => {
      toast.error("Failed to create competency", { id: "create-competency" });
    },
  });

  return mutation
}