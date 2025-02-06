import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { compentenciesInsertSchema, competencies } from "@/db/schema";

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
        .from(competencies)
        .where(eq(competencies.inTrash, false))

      return c.json({ data });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      compentenciesInsertSchema.omit({
        createdBy: true,
        updatedBy: true,
        inTrash: true,
      })
    ),
    async (c) => {
      const auth = c.get("authUser");

      const value = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      
      await db
        .insert(competencies)
        .values({
          ...value,
          createdBy: auth.token.id,
          updatedBy: auth.token.id,
        });

      return c.json(null, 200);
    }
  )

export default app;