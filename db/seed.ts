import { Subscription, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  // TODO
  await db.insert(Subscription).values([{ email: "john@gmail.com" }]);
}
