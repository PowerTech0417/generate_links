export default {
  async fetch(request, env) {
    // 允许所有来源访问（CORS）
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 处理预检请求
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const targetURL = url.searchParams.get("url");
    const customPath = url.searchParams.get("path") || "";

    if (!targetURL) {
      return new Response(JSON.stringify({ error: "Missing 'url' parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // === ⚙️ 你的 Short.io 配置 ===
    const SHORT_API_KEY = "pk_1x1NMq5cuSHbYAPJ"; // 你的 Short.io API Key
    const DOMAIN_ID = "1160790"; // 你的用户 Dashboard ID
    const SHORT_DOMAIN = "ott-short.link"; // ⚠️ 改成你在 Short.io 的域名
    // =============================

    const body = {
      originalURL: targetURL,
      domain: SHORT_DOMAIN,
      path: customPath, // 例: id1234
    };

    try {
      const response = await fetch(`https://api.short.io/links`, {
        method: "POST",
        headers: {
          "Authorization": SHORT_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      return new Response(JSON.stringify({
        success: true,
        shortURL: data.shortURL || null,
        error: data.error || null,
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });

    } catch (err) {
      return new Response(JSON.stringify({
        success: false,
        error: err.message,
      }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }
};
