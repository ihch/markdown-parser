import { renderHTML } from "./renderer.ts";
import { Token, tokenize } from "./tokenize.ts";
import { diff } from "./diff.ts";
import { formatHTML } from "./formatter.ts";

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

    hogehoge  


    hogehoge

    \`console.log("Hello, world!")\`

    [Link](https://www.google.com)

    <img src="https://pbs.twimg.com/media/FzihpskaUAAeAjw?format=jpg&name=small" />

    \`\`\`typescript
    const s: string = "text";
    console.log(s);
    \`\`\`
    `;

  const html = convertMarkdownToHTML(markdown);
  const formattedHTML = await formatHTML(html);

  const diffResult = await diff(html, formattedHTML);
  console.log(diffResult);
}
