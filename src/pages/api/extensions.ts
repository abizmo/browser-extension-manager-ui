import extensions from "@data/data.json";

import type { APIRoute } from "astro";

function delay(ms: number) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() < 0.05) reject(new Error("Error para las risas"));
      else resolve(undefined);
    }, ms),
  );
}

export const GET: APIRoute = async () => {
  try {
    await delay(500);

    return new Response(JSON.stringify({ success: true, data: extensions }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
