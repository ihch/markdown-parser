# markdown-parser

```typescript
if (import.meta.main) {
  const markdown = `
    # Heading1

    text

    # Heading2

    text
    `;
  const result = convertMarkdownToHTML(markdown);
  console.log(result);
  /*
  Output: <h1>Heading1</h1><p>text</p><h1>Heading2</h1><p>text</p>
  */
}
```
