# .eslintrc.cjs

```cjs
/** @type {import("eslint").Linter.Config} */
const config = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": true
  },
  "plugins": [
    "@typescript-eslint",
    "drizzle"
  ],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked"
  ],
  "rules": {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": {
          "attributes": false
        }
      }
    ],
    "drizzle/enforce-delete-with-where": [
      "error",
      {
        "drizzleObjectName": [
          "db",
          "ctx.db"
        ]
      }
    ],
    "drizzle/enforce-update-with-where": [
      "error",
      {
        "drizzleObjectName": [
          "db",
          "ctx.db"
        ]
      }
    ]
  }
}
module.exports = config;
```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# database
/prisma/db.sqlite
/prisma/db.sqlite-journal
db.sqlite

# next.js
/.next/
/out/
next-env.d.ts

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
# do not commit any .env files to git, except for the .env.example file. https://create.t3.gg/en/usage/env-variables#using-environment-variables
.env
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo

# idea files
.idea
```

# drizzle.config.ts

```ts
import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["biteclub_*"],
} satisfies Config;

```

# drizzle/0000_complete_meltdown.sql

```sql
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"user_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"display_name" text,
	"bio" text,
	"avatar_url" text,
	"last_active" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipes" ADD CONSTRAINT "recipes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

```

# drizzle/meta/_journal.json

```json
{
  "version": "7",
  "dialect": "postgresql",
  "entries": [
    {
      "idx": 0,
      "version": "7",
      "when": 1739389061112,
      "tag": "0000_complete_meltdown",
      "breakpoints": true
    }
  ]
}
```

# drizzle/meta/0000_snapshot.json

```json
{
  "id": "745d5a4a-9ec4-47d2-bb10-da3fe147e016",
  "prevId": "00000000-0000-0000-0000-000000000000",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.recipes": {
      "name": "recipes",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "user_id": {
          "name": "user_id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "recipes_user_id_users_id_fk": {
          "name": "recipes_user_id_users_id_fk",
          "tableFrom": "recipes",
          "tableTo": "users",
          "columnsFrom": [
            "user_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.users": {
      "name": "users",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true
        },
        "email": {
          "name": "email",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "default": "now()"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    },
    "public.profiles": {
      "name": "profiles",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "user_id": {
          "name": "user_id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "display_name": {
          "name": "display_name",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "bio": {
          "name": "bio",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "avatar_url": {
          "name": "avatar_url",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "last_active": {
          "name": "last_active",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "profiles_user_id_users_id_fk": {
          "name": "profiles_user_id_users_id_fk",
          "tableFrom": "profiles",
          "tableTo": "users",
          "columnsFrom": [
            "user_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {
        "profiles_user_id_unique": {
          "name": "profiles_user_id_unique",
          "nullsNotDistinct": false,
          "columns": [
            "user_id"
          ]
        }
      }
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}
```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# next.config.js

```js
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {};

export default config;

```

# package.json

```json
{
  "name": "biteclub",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "next build",
    "check": "next lint && tsc --noEmit",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "dev": "next dev --turbo",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "preview": "next build && next start",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "format:write": "prettier --write \"**/*.{ts,tsx,js,jsx,mdx}\" --cache",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,mdx}\" --cache"
  },
  "dependencies": {
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.48.1",
    "@t3-oss/env-nextjs": "^0.10.1",
    "ai-digest": "^1.0.8",
    "drizzle-orm": "^0.33.0",
    "geist": "^1.3.0",
    "next": "^15.0.1",
    "postgres": "^3.4.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zod": "^3.23.3"
  },
  "devDependencies": {
    "@types/eslint": "^8.56.10",
    "@types/node": "^20.14.10",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^8.1.0",
    "@typescript-eslint/parser": "^8.1.0",
    "drizzle-kit": "^0.24.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.0.1",
    "eslint-plugin-drizzle": "^0.2.3",
    "postcss": "^8.4.39",
    "prettier": "^3.3.2",
    "prettier-plugin-tailwindcss": "^0.6.5",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.5.3"
  },
  "ct3aMetadata": {
    "initVersion": "7.38.1"
  },
  "packageManager": "npm@10.1.0"
}

```

# postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
  },
};

```

# prettier.config.js

```js
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
};

```

# public/favicon.ico

This is a binary file of the type: Binary

# README.md

```md
# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

```

# src/actions/auth.ts

```ts

```

# src/actions/recipes.ts

```ts

```

# src/app/(app)/layout.tsx

```tsx
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

```

# src/app/(auth)/layout.tsx

```tsx
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

```

# src/app/(auth)/login/page.tsx

```tsx
export default function Login() {
  return <h1>Login page</h1>;
}

```

# src/app/(auth)/signup/page.tsx

```tsx
export default function SignUp() {
  return <h1>Sign Up page</h1>;
}

```

# src/app/(marketing)/components/Hero.tsx

```tsx
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full overflow-clip">
      <div className="mx-auto max-w-screen-xl">
        <div className="relative sm:overflow-hidden sm:rounded-2xl">
          <div className="relative px-6 py-10 sm:py-12 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-lg">
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block">All your recipes</span>
                <span className="block">in one place</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-zinc-600 sm:max-w-3xl">
                The easiest way to collect, organize and share all your favorite
                recipes from one place.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:gap-5 sm:space-y-0">
                <Link
                  href="/signup"
                  className="flex items-center justify-center rounded-full border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white sm:px-8"
                >
                  Get started for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

# src/app/(marketing)/layout.tsx

```tsx
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

```

# src/app/(marketing)/page.tsx

```tsx
import Hero from "./components/Hero";
// import OrganizeRecipes from './components/OrganizeRecipes';
// import CreateRecipes from './components/CreateRecipes';
// import ShareRecipes from './components/ShareRecipes';
// import Footer from './Footer';
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-w-screen-xl flex min-h-screen flex-col justify-items-center gap-16 px-3 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex flex-col items-center sm:items-start">
        <Hero />
        <div className="mx-auto">
          {/* <Image
            width={900}
            height={358}
            src="app-shot.svg"
            alt="Biteclube logo mark"
          /> */}
        </div>
        <div className="mx-auto">{/* <OrganizeRecipes /> */}</div>
        <div className="mx-auto">{/* <CreateRecipes /> */}</div>
        <div className="mx-auto">{/* <ShareRecipes /> */}</div>
        <div className="mx-auto">{/* <Footer /> */}</div>
      </main>
    </div>
  );
}

```

# src/env.js

```js
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});

```

# src/lib/supabase/client.ts

```ts
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

```

# src/lib/supabase/middleware.ts

```ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const createClient = (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  return supabaseResponse;
};

```

# src/lib/supabase/server.ts

```ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}

```

# src/server/db/index.ts

```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });

```

# src/server/db/schema/index.ts

```ts
export * from "./recipes";
export * from "./users";
export * from "./profiles";

```

# src/server/db/schema/profiles.ts

```ts
import { pgTable, text, timestamp, uuid, json } from "drizzle-orm/pg-core";
import { users } from "./users";

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  // Profile information
  displayName: text("display_name"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),

  // Metadata
  lastActive: timestamp("last_active"),
  updatedAt: timestamp("updated_at"),
});

```

# src/server/db/schema/recipes.ts

```ts
import { pgTable, text, timestamp, uuid, json } from "drizzle-orm/pg-core";
import { users } from "./users";

export const recipes = pgTable("recipes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  userId: uuid("user_id").references(() => users.id),
});

```

# src/server/db/schema/users.ts

```ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Managed by supabase auth
export const users = pgTable("users", {
  id: uuid("id").primaryKey(), // matches Supabase auth.users.id
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

```

# src/styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

# start-database.sh

```sh
#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh`

# On Linux and macOS you can run this script directly - `./start-database.sh`

DB_CONTAINER_NAME="biteclub-postgres"

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if ! docker info > /dev/null 2>&1; then
  echo "Docker daemon is not running. Please start Docker and try again."
  exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running"
  exit 0
fi

if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Existing database container '$DB_CONTAINER_NAME' started"
  exit 0
fi

# import env variables from .env
set -a
source .env

DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')

if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default database password"
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Please change the default password in the .env file and try again"
    exit 1
  fi
  # Generate a random URL-safe password
  DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
  sed -i -e "s#:password@#:$DB_PASSWORD@#" .env
fi

docker run -d \
  --name $DB_CONTAINER_NAME \
  -e POSTGRES_USER="postgres" \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  -e POSTGRES_DB=biteclub \
  -p "$DB_PORT":5432 \
  docker.io/postgres && echo "Database container '$DB_CONTAINER_NAME' was successfully created"

```

# tailwind.config.ts

```ts
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;

```

# tsconfig.json

```json
{
  "compilerOptions": {
    /* Base Options: */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,

    /* Strictness */
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "checkJs": true,

    /* Bundled projects */
    "lib": ["dom", "dom.iterable", "ES2022"],
    "noEmit": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "plugins": [{ "name": "next" }],
    "incremental": true,

    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": [
    ".eslintrc.cjs",
    "next-env.d.ts",
    "**/*.ts",
    "**/**/*.ts",
    "**/**/**/*.ts",
    "**/*.tsx",
    "**/*.cjs",
    "**/*.js",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}

```

