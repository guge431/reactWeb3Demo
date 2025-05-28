// functions/api/hello.js

export async function onRequest(context) {
    return new Response(JSON.stringify({
      message: "你好，这是来自 Cloudflare Pages Functions 的响应！"
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }