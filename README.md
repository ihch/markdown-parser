# markdown-parser

```typescript
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
  /*
  Output: <h1>Heading1 <strong>bold</strong></h1>
    text <strong>strong Hello</strong><h2>Heading2</h2>    
    text <i>italic Hello</i><pre>console.log("Hello, world!")</pre><a href="https://www.google.com" target="_blank">Link</a>
  */
}
```
