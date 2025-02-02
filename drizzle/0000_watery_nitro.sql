CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "group" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" text,
	"year" text NOT NULL,
	"inTrash" boolean NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" text NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"updatedBy" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"image" text,
	"role" "role" DEFAULT 'USER' NOT NULL,
	"password" text NOT NULL
);
