import { Token } from "./tokenize.ts";

export function renderHTML(ast: Token[]): string {
  const html = ast.reduce(
    (prev, cur) => {
      if (cur.type === "TEXT") {
        return prev + `${cur.content}`;
      }
      if (cur.type === "STRONG") {
        return prev + `<strong>${cur.content}</strong>`;
      }
      if (cur.type === "ITALIC") {
        return prev + `<i>${cur.content}</i>`;
      }
      if (cur.type === "CODE") {
        return prev + `<code>${cur.content}</code>`;
      }
      if (cur.type === "ANCHOR") {
        return prev + `<a href="${cur.href}" target="_blank">${cur.content}</a>`
      }
      if (cur.type === "HEADING") {
        return prev +
          `<h${cur.level}>${renderHTML(cur.children)}</h${cur.level}>`;
      }
      if (cur.type === "CODEBLOCK") {
        return prev + `<pre class="lang-${cur.language}"><code>${cur.content}</code></pre>`
      }
      return prev;
    },
    "",
  );
  return html;
}
