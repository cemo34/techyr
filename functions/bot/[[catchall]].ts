// Cloudflare Pages Function: Proxy /bot/* to techyr-bot.pages.dev
export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  // Target is the techyr-bot Cloudflare Pages deployment
  const targetHost = 'techyr-bot.pages.dev';
  
  // Forward to target while preserving pathname and query parameters
  const targetUrl = new URL(url.pathname + url.search, https://);
  
  const modifiedRequest = new Request(targetUrl.toString(), {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: 'manual'
  });

  return fetch(modifiedRequest);
};
