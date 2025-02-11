import { toast } from "sonner";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.competencies["trash"][":id"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.competencies["trash"][":id"]["$patch"]>;


export const useTrashCompetency = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.competencies["trash"][":id"]["$patch"]({ param });

      if (!response.ok) {
        throw new Error("Failed to trash competency");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Competency trashed", { id: "trash-competency" });
      queryClient.invalidateQueries({ queryKey: ["competencies"] });
    },
    onError: () => {
      toast.error("Failed to trash competency", { id: "trash-competency" });
    },
  });

  return mutate;
}