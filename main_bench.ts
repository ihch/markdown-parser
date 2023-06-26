import { convertMarkdownToHTML } from "./main.ts";

Deno.bench(function parse() {
  convertMarkdownToHTML("Markdown");
});
