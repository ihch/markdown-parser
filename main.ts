import { renderHTML } from "./renderer.ts";
import { Token, tokenize } from "./tokenize.ts";

function parse(markdown: string): Token[] {
  const ast = tokenize(markdown);
  return ast;
}

export function convertMarkdownToHTML(markdown: string): string {
  const ast = parse(markdown.trim());
  return renderHTML(ast);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const markdown = `
    # Heading1 **bold**

    text **strong Hello**

    ## Heading2

    text *italic Hello*

    \`console.log("Hello, world!")\`

    [Link](https://www.google.com)
    `;
  const result = convertMarkdownToHTML(markdown);
  console.log(result);
}
