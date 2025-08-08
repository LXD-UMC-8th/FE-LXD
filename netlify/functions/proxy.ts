import type { Handler } from "@netlify/functions";

const ORIGIN_BASE = process.env.ORIGIN_BASE!;
const SHARED_KEY = process.env.ORIGIN_SHARED_KEY; // optional

export const handler: Handler = async (event) => {
  try {
    const { httpMethod, headers, body, path } = event;
    // strip the /api prefix before forwarding
    const forwardPath = path.replace(/^\/api/, "");

    // Build upstream URL without exposing it to the client
    const url = new URL(forwardPath, ORIGIN_BASE);

    // Forward headers, but sanitize hop-by-hop and host headers
    const { ...restHeaders } = headers as Record<string, string>;
    const upstreamHeaders: Record<string, string> = { ...restHeaders };

    // Pass a private auth header to your origin to ensure only the proxy can call it
    if (SHARED_KEY) upstreamHeaders["x-proxy-key"] = SHARED_KEY;

    const res = await fetch(url.toString(), {
      method: httpMethod,
      headers: upstreamHeaders,
      body: ["GET", "HEAD"].includes(httpMethod) ? undefined : body,
    });

    const buf = Buffer.from(await res.arrayBuffer());

    return {
      statusCode: res.status,
      headers: Object.fromEntries(res.headers), // or filter as needed
      body: buf.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 502, body: `Proxy error: ${err}` };
  }
};
