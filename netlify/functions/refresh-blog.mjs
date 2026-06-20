// Scheduled function: triggers a Netlify rebuild on a fixed cadence so the
// Substack blog feed refreshes.
//
// The blog list is fetched at *build time* (see src/utils/substackFeed.ts),
// so new Substack posts only appear after a redeploy. This function runs on
// a schedule and POSTs to a Netlify Build Hook to kick off that redeploy.
//
// Setup (one-time, in the Netlify UI):
//   1. Site configuration -> Build & deploy -> Build hooks -> "Add build hook"
//      (point it at the production branch, e.g. main). Copy the URL.
//   2. Site configuration -> Environment variables -> add:
//        BLOG_REBUILD_HOOK_URL = <the build hook URL>
//
// The hook URL is a secret, so it lives in an env var, never in the repo.

export const config = {
  // Daily at 11:00 UTC. Cron syntax: min hour day month weekday.
  schedule: "0 11 * * *",
};

export default async () => {
  const hookUrl = process.env.BLOG_REBUILD_HOOK_URL;

  if (!hookUrl) {
    console.error(
      "BLOG_REBUILD_HOOK_URL is not set — skipping the scheduled rebuild. " +
        "Add it in Netlify env vars (see netlify/functions/refresh-blog.mjs).",
    );
    return new Response("Missing BLOG_REBUILD_HOOK_URL", { status: 500 });
  }

  const res = await fetch(hookUrl, { method: "POST" });

  if (!res.ok) {
    console.error(`Build hook responded ${res.status} ${res.statusText}`);
    return new Response(`Build hook failed: ${res.status}`, { status: 502 });
  }

  console.log("Triggered a Netlify rebuild to refresh the Substack blog feed.");
  return new Response("Rebuild triggered", { status: 200 });
};
