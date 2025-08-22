export function normalizeQuillHtml(raw?: string): string {
  if (!raw) return "";
  let html = raw
    .replace(/\\"/g, '"')
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\\\/g, "\\");

  html = html.replace(/<span\s+class="ql-ui"[^>]*><\/span>/g, "");

  html = html
    .replace(
      /<li([^>]*)\sdata-list="bullet"([^>]*)>/g,
      '<li$1$2 class="list-disc">'
    )
    .replace(
      /<li([^>]*)\sdata-list="ordered"([^>]*)>/g,
      '<li$1$2 class="list-decimal">'
    );

  html = html
    .replace(/<ol(\s[^>]*)?>/g, (_m, attrs = "") =>
      attrs && /class="/.test(attrs)
        ? `<ol${attrs.replace(/class="/, 'class="list-decimal pl-6 ')}>`
        : `<ol class="list-decimal pl-6">`
    )
    .replace(/<ul(\s[^>]*)?>/g, (_m, attrs = "") =>
      attrs && /class="/.test(attrs)
        ? `<ul${attrs.replace(/class="/, 'class="list-disc pl-6 ')}>`
        : `<ul class="list-disc pl-6">`
    );

  html = html.replace(/\sdata-list="(?:bullet|ordered)"/g, "");
  return html;
}
