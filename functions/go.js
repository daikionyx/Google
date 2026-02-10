export async function onRequest({ request, env }) {
  // IP取得
  const ip =
    request.headers.get("CF-Connecting-IP") ??
    "unknown";

  const ua =
    request.headers.get("User-Agent") ??
    "unknown";

  const time = new Date().toISOString();

  // 一意なキー（安全版）
  const key = `${time}-${Math.random().toString(36).slice(2)}`;

  // ログ内容
  const log = {
    time,
    ip,
    ua,
    path: new URL(request.url).pathname
  };

  // KVに保存
  await env.ACCESS_LOGS.put(key, JSON.stringify(log));

  // 転送（302 Temporary Redirect）
  return Response.redirect(
    "https://www.google.com",
    302
  );
}
