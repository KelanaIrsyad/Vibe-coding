import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./schema";

const app = new Elysia()
  .decorate("db", db)
  .get("/", () => "Hello Elysia")
  .get("/users", async ({ db }) => {
    try {
      return await db.select().from(users);
    } catch (error) {
      return { error: "Failed to fetch users. Is the database running and credentials correct?" };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
