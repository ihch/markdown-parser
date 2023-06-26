const heading_regexp = /^(?<level>#+)\s+(?<content>\S+)$/;

// inline
// const bold_regexp = /\*\*(?<content>\S+)\*\*/;
// const italic_regexp = /\*\*(?<content>\S+)\*/;

// multiline
// const codeblock_regexp = //;

type Node = {
  type: "TEXT" | "HEADING";
  text: string;
  tag: string;
  node: Node[] | null;
};

function parse(markdown: string): Node[] {
  const markdownRoots = markdown.split("\n");
  const ast: Node[] = [];

  for (let i = 0; i < markdownRoots.length; i++) {
    const line = markdownRoots[i].trim();

    if (line === "") continue;

    const heading1 = line.match(heading_regexp);
    if (heading1) {
      const level = heading1.groups?.level.length || 1;
      const content = heading1.groups?.content || "";
      ast.push({
        type: "HEADING",
        text: content,
        tag: `h${level}`,
        node: null,
      });
    } else {
      ast.push({ type: "TEXT", text: line, tag: `p`, node: null });
    }
  }

  return ast;
}

function renderHTML(ast: Node[]): string {
  const html = ast.reduce(
    (prev, cur) => {
      return prev + `<${cur.tag}>${cur.text}</${cur.tag}>`;
    },
    "",
  );
  return html;
}

export function convertMarkdownToHTML(markdown: string): string {
  const ast = parse(markdown.trim());
  return renderHTML(ast);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const markdown = `
    # Heading1

    text

    # Heading2

    text
    `;
  const result = convertMarkdownToHTML(markdown);
  console.log(result);
}
