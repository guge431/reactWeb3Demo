import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:3000', // 本地开发
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Max-Age': '86400',
  };

  // 处理预检请求（OPTIONS）
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // 处理 API 请求
  if (url.pathname.startsWith('/api/hello')) {
    return new Response(JSON.stringify({ message: 'Hello from Worker!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  // 服务静态资源（CRA 的 build 文件）
  try {
    return await getAssetFromKV(event, {
      mapRequestToAsset: serveSinglePageApp,
    });
  } catch (error) {
    return new Response('Not Found', { status: 404 });
  }
}
