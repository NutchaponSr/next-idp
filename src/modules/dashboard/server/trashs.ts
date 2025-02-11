import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";

import { TrashCategory } from "@/types/trash";

import { db } from "@/db/drizzle";
import { desc, eq, inArray } from "drizzle-orm";
import { competencies, groups, users } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()
  .get(
    "/",
    verifyAuth(),
    async (c) => {
      const auth = c.get("authUser");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [group, competency] = await Promise.all([
        db
          .select({
            id: groups.id,
            name: groups.name,
            icon: groups.icon,
            description: groups.year,
            updatedAt: groups.updatedAt,
            updatedBy: groups.updatedBy,
          })
          .from(groups)
          .where(eq(groups.inTrash, true))
          .orderBy(desc(groups.updatedAt)),
        db
          .select({
            id: competencies.id,
            name: competencies.name,
            icon: competencies.icon,
            description: competencies.type,
            updatedAt: competencies.updatedAt,
            updatedBy: competencies.updatedBy,
          })
          .from(competencies)
          .where(eq(competencies.inTrash, true))
          .orderBy(desc(competencies.updatedAt)),
      ]);

      const parsedCompetency = competency.map(item => ({
        ...item,
        description: String(item.description),
      }));

      const populatedData = [
        ...(group.map(group => ({
          ...group,
          type: TrashCategory.GROUP,
        })) || []),
        ...(parsedCompetency.map(competency => ({
          ...competency,
          type: TrashCategory.COMPETENCY
        })) || []),
      ].sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1)); 

      const updatedPeoples = await db
        .select({
          id: users.id,
          label: users.name,
          header: users.image,
        })
        .from(users)
        .where(
          inArray(
            users.id,
            Array.from(new Set(populatedData.map((item) => item.updatedBy)))
          )
        );

      return c.json({
        data: {
          populatedData,
          updatedPeoples,
        }
      })
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    zValidator(
      "json",
      z.object({
        variant: z.enum(["GROUP", "COMPETENCY"] as const)
      })
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { id } = c.req.valid("param");
      const { variant } = c.req.valid("json");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      let updatedRecord = null;

      switch (variant) {
        case "GROUP": 
          [updatedRecord] = await db.update(groups)
            .set({
              inTrash: false,
            })
            .where(eq(groups.id, id))
            .returning();
          break;

        case "COMPETENCY": 
          [updatedRecord] = await db.update(competencies)
            .set({
              inTrash: false,
            })
            .where(eq(competencies.id, id))
            .returning();
          break;
      }

      if (!updatedRecord) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200)
    }
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    zValidator(
      "json",
      z.object({
        variant: z.enum(["GROUP", "COMPETENCY"] as const)
      })
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { id } = c.req.valid("param");
      const { variant } = c.req.valid("json");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      let deletedRecord = null;

      switch (variant) {
        case "GROUP": 
          [deletedRecord] = await db.delete(groups)
            .where(eq(groups.id, id))
            .returning();
          break;

        case "COMPETENCY": 
          [deletedRecord] = await db.delete(competencies)
            .where(eq(competencies.id, id))
            .returning();
          break;
      }

      if (!deletedRecord) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(null, 200)
    }
  )
  .post(
    "/bulk-delete",
    verifyAuth(),
    async (c) => {
      const auth = c.get("authUser");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      console.log("Here")

      await Promise.all([
        db.delete(groups)
          .where(eq(groups.inTrash, true)),
        db.delete(competencies)
          .where(eq(competencies.inTrash, true)),
      ]);

      return c.json(null, 200);
    }
  )

export default app;