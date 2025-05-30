import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  const origin = request.headers.get("Origin");
  // ✅ 设置允许跨域的来源列表
  const allowedOrigins = [
    "http://localhost:3000",
    "https://guge.wps.baby", // 你的正式前端域名
  ];

  const isOriginAllowed = allowedOrigins.includes(origin);

  const corsHeaders = {
    "Access-Control-Allow-Origin": isOriginAllowed ? origin : "", // 动态设置
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
  }else if(url.pathname.startsWith('/api/deepseek/ai')){
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    const body = await request.json();
    const deepseekRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer sk-b3b144cc111f4f67bd1fe3f0b6d368f6', 
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: body.messages,
      }),
    });

    const data = await deepseekRes.text();
    return new Response(data, {
      status: deepseekRes.status,
      headers: {
        'Content-Type': 'application/json',
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
