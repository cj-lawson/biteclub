ALTER TABLE "recipes" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "image_url" text;