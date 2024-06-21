import { column, defineDb, defineTable } from "astro:db";

// https://astro.build/db/config
const Subscription = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text(),
  },
});

export default defineDb({
  tables: { Subscription },
});
