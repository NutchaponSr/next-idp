import { z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { sortMap } from "@/types/filter";

import { db } from "@/db/drizzle";
import { and, eq, inArray, ilike } from "drizzle-orm";
import { competencies, groups, users } from "@/db/schema";
import { TrashCategory } from "@/types/trash";
import { parse } from "date-fns";
import { formatDateCondition } from "../utils";

const app = new Hono()
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        sort: z.string().nullish(),
        search: z.string().optional(),
        from: z.string().optional(),
        to: z.string().optional(),
        rangeBy: z.enum(["EDIT", "CREATE"]).default("CREATE"),
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { search, sort, from, to, rangeBy } = c.req.valid("query");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const toDate = to ? parse(to, "yyyy-MM-dd", new Date()) : null;
      const fromDate = from ? parse(from, "yyyy-MM-dd", new Date()) : null;
      const searchTerm = search && search.trim() !== "" ? `${search.toLowerCase()}` : null;
      const rangeField = {
        group: rangeBy !== "EDIT" ? groups.createdAt : groups.updatedAt,
        competency: rangeBy !== "EDIT" ? competencies.createdAt : competencies.updatedAt,
      }

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
              searchTerm ? ilike(groups.name, `${searchTerm}%`) : undefined,
              ...formatDateCondition(fromDate, toDate, rangeField.group),
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
              searchTerm ? ilike(competencies.name, `${searchTerm}%`) : undefined,
              ...formatDateCondition(fromDate, toDate, rangeField.competency)
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
          { label: "Group", data: group.map(item => ({ ...item, category: TrashCategory.GROUP })) },
          { label: "Competency", data: parsedCompetency.map(item => ({ ...item, category: TrashCategory.COMPETENCY })) },
        ],
        createdPeoples,
      })
    }
  )

export default app;