import type { APIRoute } from "astro";
import { Subscription, db } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const existingSubscriber = (await db.select().from(Subscription)).find(
      (user) => user.email === email,
    );

    if (existingSubscriber) {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 409,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const subscription = await db.insert(Subscription).values({ email });

    return new Response(JSON.stringify(subscription), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
