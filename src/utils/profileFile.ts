export function extractFilenameFromUrl(url?: string | null): string {
  if (!url) return "";
  try {
    const u = new URL(url, window.location.origin); // 절대/상대 모두 대응
    const last = u.pathname.split("/").pop() ?? "";
    // S3 프리사인 같은 경우에도 안전하게 디코드
    return decodeURIComponent(last);
  } catch {
    // URL 객체로 못 만들면 그냥 문자열에서 처리
    const path = url.split("?")[0];
    return decodeURIComponent(path.split("/").pop() ?? "");
  }
}
