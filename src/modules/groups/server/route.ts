import { z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { groups, groupsInsertSchema, users } from "@/db/schema";

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

      const groupsWithUpdatedBy = await Promise.all(
        data.map(async (group) => {
          const updatedByUser = await db
            .select({ name: users.name })
            .from(users)
            .where(eq(users.id, group.updatedBy))
          
          return {
            ...group,
            updatedBy: updatedByUser[0].name,
          };
        }),
      );
      
      return c.json({ data: groupsWithUpdatedBy });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      groupsInsertSchema.pick({
        icon: true,
        name: true,
        year: true,
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
  .post(
    "/duplicate/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { id } = c.req.valid("param");
      console.log(auth);

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      
      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [query] = await db
        .select()
        .from(groups)
        .where(eq(groups.id, id));

      if (!query) {
        return c.json({ error: "Not found" }, 404);
      }

      await db
        .insert(groups)
        .values({
          inTrash: false,
          icon: query.icon,
          year: query.year,
          createdBy: auth.token.sub,
          updatedBy: auth.token.sub,
          name: query.name + "(Copy)",
        });

      return c.json(null, 200);
    }
  )
  .patch(
    "/rename/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    zValidator(
      "json",
      groupsInsertSchema.pick({
        icon: true,
        name: true,
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { id } = c.req.valid("param");
      const value = c.req.valid("json");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .update(groups)
        .set({
          ...value,
          updatedBy: auth.token.sub,
        })
        .where(eq(groups.id, id))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200);
    }
  )
  .patch(
    "/trash/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { id } = c.req.valid("param");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .update(groups)
        .set({ inTrash: true })
        .where(eq(groups.id, id))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200);
    }
  )
  .patch(
    "/restore/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { id } = c.req.valid("param");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .update(groups)
        .set({ inTrash: false })
        .where(eq(groups.id, id))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200);
    }
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { id } = c.req.valid("param");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .delete(groups)
        .where(eq(groups.id, id))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200);
    }
  )

export default app;