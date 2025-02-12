import { z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { sortMap } from "@/types/filter";

import { db } from "@/db/drizzle";
import { and, eq, inArray, sql } from "drizzle-orm";
import { competencies, groups, users } from "@/db/schema";

const app = new Hono()
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        sort: z.string().nullish(),
        search: z.string().optional(),
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { search, sort } = c.req.valid("query");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const searchTerm = search && search.trim() !== "" ? `${search}` : null;

      const [sortFn, field] = sortMap[sort as keyof typeof sortMap] ?? sortMap.DEFAULT;

      const [group, competency] = await Promise.all([
        db
          .select({
            id: groups.id,
            name: groups.name,
            icon: groups.icon, 
            description: groups.year,
            createdBy: groups.createdBy,
            createdAt: groups.createdAt,
          })
          .from(groups)
          .where(
            and(
              eq(groups.inTrash, false),
              searchTerm ? sql`LOWER(${groups.name}) LIKE ${searchTerm}` : undefined,
            )
          )
          .orderBy(sortFn(groups[field])),
        db
          .select({
            id: competencies.id,
            name: competencies.name,
            icon: competencies.icon, 
            description: competencies.type,
            createdBy: competencies.createdBy,
            createdAt: competencies.createdAt,
          })
          .from(competencies)
          .where(
            and(
              eq(competencies.inTrash, false),
              searchTerm ? sql`LOWER(${competencies.name}) LIKE ${searchTerm}` : undefined,
            )
          )
          .orderBy(sortFn(competencies[field])),
      ]);

      const parsedCompetency = competency.map(item => ({
        ...item,
        description: String(item.description),
      }));

      const createdPeoples = await db
        .select({
          id: users.id,
          label: users.name,
          header: users.image,
        })
        .from(users)
        .where(
          inArray(
            users.id,
            Array.from(new Set([...group, ...competency].map(item => item.createdBy)))
          )
        );

      return c.json({
        data: [
          { label: "Group", data: group.map(item => ({ ...item, category: "Group" })) },
          { label: "Competency", data: parsedCompetency.map(item => ({ ...item, category: "Competency" })) },
        ],
        createdPeoples,
      })
    }
  )

export default app;