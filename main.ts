export function convertMarkdownToHTML(markdown: string): string {
  return markdown;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  convertMarkdownToHTML("Markdown");
}
