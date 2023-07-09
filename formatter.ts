import * as prettier from "npm:prettier";

export function formatHTML(html: string): Promise<string> {
  return prettier.format(html, {
    semi: true,
    singleQuote: true,
    parser: "html",
  });
}
