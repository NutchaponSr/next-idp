import { z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { groups } from "@/db/schema";

const app = new Hono()
  .get(
    "/",
    verifyAuth(),
    async (c) => {
      const auth = c.get("authUser");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(groups)
        .where(eq(groups.inTrash, false))
      
      return c.json({ data });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        icon: z.string().nullable(),
        name: z.string().nullable(),
        year: z.string(),
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { icon, name, year } = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      await db
        .insert(groups)
        .values({
          icon,
          year,
          name: name || "Untitled",
          createdBy: auth.token.id,
          updatedBy: auth.token.id,
        });

      return c.json(null, 200);
    }
  )

export default app;