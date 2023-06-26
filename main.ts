type Node = {
  type: 'TEXT';
  text: string;
  node: Node[] | null;
}

function parse(markdown: string): Node {
  return { type: 'TEXT', text: markdown, node: null }
}

function renderHTML(node: Node): string {
  if (node.type === 'TEXT') {
    return `<p>${node.text}</p>`;
  }
  return '';
}

export function convertMarkdownToHTML(markdown: string): string {
  const ast = parse(markdown);
  return renderHTML(ast);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const result = convertMarkdownToHTML("Markdown");
  console.log(result);
}
