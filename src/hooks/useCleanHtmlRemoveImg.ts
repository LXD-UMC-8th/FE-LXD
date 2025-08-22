import { useMemo, type ReactNode } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];
const REMOVE_TAGS = [...HEADING_TAGS, "img"];

export function useCleanHtmlRemoveImg(htmlString: string | null): ReactNode {
  return useMemo(() => {
    if (!htmlString) return null;
    const sanitized = DOMPurify.sanitize(htmlString, {
      FORBID_TAGS: REMOVE_TAGS,
    });
    const cleaned = sanitized.startsWith('"') ? sanitized.slice(1) : sanitized;

    return parse(
      cleaned.lastIndexOf('"') === cleaned.length - 1
        ? cleaned.slice(0, -1)
        : cleaned
    );
  }, [htmlString]);
}
