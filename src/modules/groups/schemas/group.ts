import { z } from "zod";

export const GroupSchema = z.object({
  icon : z.string().nullable(),
  name: z.string().min(1, "Required"),
  year: z.string().min(1, "Required"),
});