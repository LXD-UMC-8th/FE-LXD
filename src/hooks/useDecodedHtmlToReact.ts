// src/hooks/useDecodedHtmlToReact.ts
import { useMemo, type ReactNode } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "u",
  "span",
  "div",
  "a",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "code",
  "img",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
];
const ALLOWED_ATTR = [
  "href",
  "target",
  "rel",
  "src",
  "alt",
  "title",
  "class",
  "width",
  "height",
  "loading",
  "decoding",
  "referrerpolicy",
  "style",
];
const ALLOWED_URI_REGEXP = /^(?:(?:https?|data):|\/?)/i;

function decodeOnce(raw?: string | null) {
  if (!raw) return "";
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") return parsed;
  } catch {
    /* not a JSON string literal */
  }
  return raw;
}

export function useDecodedHtmlToReact(raw: string | null): ReactNode {
  return useMemo(() => {
    const decoded = decodeOnce(raw ?? "");
    const safe = DOMPurify.sanitize(decoded, {
      ALLOWED_TAGS,
      ALLOWED_ATTR,
      ALLOW_DATA_ATTR: true,
      ALLOWED_URI_REGEXP,
      USE_PROFILES: { html: true },
    });
    return parse(safe, {
      replace: (node: any) => {
        if (node?.name === "img" && node.attribs) {
          const a = node.attribs;
          if (a.src) a.src = encodeURI(a.src);
          a.loading = a.loading || "lazy";
          a.decoding = a.decoding || "async";
          a.referrerpolicy = a.referrerpolicy || "no-referrer";
          a.style = `${a.style ?? ""};max-width:100%;height:auto;`;
        }
        if (node?.name === "a" && node.attribs?.href) {
          node.attribs.rel = node.attribs.rel || "noopener noreferrer";
          node.attribs.target = node.attribs.target || "_blank";
        }
        return undefined;
      },
    });
  }, [raw]);
}
