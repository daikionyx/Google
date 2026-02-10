export async function onRequest({ request, env }) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const time = new Date().toISOString();

  // KV が正しくバインドされているか確認
  if (!env.ACCESS_LOGS) {
    return new Response("KV binding missing", { status: 500 });
  }

  const key = `${time}-${Math.random().toString(36).slice(2)}`;

  await env.ACCESS_LOGS.put(key, ip);

  return Response.redirect(
    "https://www.google.com/maps/search/%E6%96%B0%E6%BD%9F%E9%A7%85/",
    302
  );
}
