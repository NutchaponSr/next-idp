import { z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { 
  compentenciesInsertSchema, 
  competencies, 
  users 
} from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq, desc } from "drizzle-orm";

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
        .orderBy(desc(competencies.createdAt))

      const populatedData = await Promise.all(
        data.map(async (competency) => {
          const updatedByUser = await db
            .select({ name: users.name })
            .from(users)
            .where(eq(users.id, competency.updatedBy))

          return {
            ...competency,
            updatedBy: updatedByUser[0].name,
          };
        }),
      );

      return c.json({ data: populatedData });
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
          .from(competencies)
          .where(eq(competencies.id, id));
  
        if (!query) {
          return c.json({ error: "Not found" }, 404);
        }
  
        await db
          .insert(competencies)
          .values({
            ...query,
            inTrash: false,
            createdBy: auth.token.sub,
            updatedBy: auth.token.sub,
            name: query.name + " (Copy)",
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
          compentenciesInsertSchema.pick({
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
            .update(competencies)
            .set({
              ...value,
              updatedBy: auth.token.sub,
            })
            .where(eq(competencies.id, id))
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
            .update(competencies)
            .set({ inTrash: true })
            .where(eq(competencies.id, id))
            .returning();
    
          if (!data) {
            return c.json({ error: "Not found" }, 404);
          }
    
          return c.json(null, 200);
        }
      )

export default app;