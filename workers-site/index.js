// 
import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler';

addEventListener("fetch", event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  const url = new URL(event.request.url);

  // 👉 API 路由：处理 /api/time
  if (url.pathname === "/api/time") {
    return new Response(
      JSON.stringify({ time: new Date().toISOString() }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  }

  // ✅ 静态资源 + CRA 路由处理
  try {
    return await getAssetFromKV(event, {
      mapRequestToAsset: serveSinglePageApp,
    });
  } catch (e) {
    return new Response("Not Found", { status: 404 });
  }
}
