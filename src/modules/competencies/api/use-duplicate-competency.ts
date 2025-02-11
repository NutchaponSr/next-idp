import { toast } from "sonner";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.competencies["duplicate"][":id"]["$post"]>;
type ResponseType = InferResponseType<typeof client.api.competencies["duplicate"][":id"]["$post"]>;


export const useDuplicateCompetency = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.competencies["duplicate"][":id"]["$post"]({ param });

      if (!response.ok) {
        throw new Error("Failed to duplicate competency");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Competency duplicated", { id: "duplicate-competency" });
      queryClient.invalidateQueries({ queryKey: ["competencies"] });
    },
    onError: () => {
      toast.error("Failed to duplicate competency", { id: "duplicate-competency" });
    },
  });

  return mutate;
}