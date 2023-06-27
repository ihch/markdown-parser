import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { convertMarkdownToHTML } from "./main.ts";

Deno.test(function parseTest() {
  assertEquals(convertMarkdownToHTML("Markdown"), "Markdown");
});

Deno.test(function headingTest() {
  assertEquals(convertMarkdownToHTML("# Markdown"), "<h1>Markdown</h1>");
  assertEquals(convertMarkdownToHTML("## Markdown"), "<h2>Markdown</h2>");
  assertEquals(convertMarkdownToHTML("### Markdown"), "<h3>Markdown</h3>");
  assertEquals(convertMarkdownToHTML("#### Markdown"), "<h4>Markdown</h4>");
});

Deno.test(function strongTest() {
  assertEquals(
    convertMarkdownToHTML("**Strong Hello**"),
    "<strong>Strong Hello</strong>",
  );
});

Deno.test(function italicTest() {
  assertEquals(convertMarkdownToHTML("*Italic Hello*"), "<i>Italic Hello</i>");
});

Deno.test(function codeTest() {
  assertEquals(
    convertMarkdownToHTML("`console.log('Hello, world!')`"),
    "<code>console.log('Hello, world!')</code>",
  );
});

Deno.test(function anchorTest() {
  assertEquals(
    convertMarkdownToHTML("[Link](https://www.google.com)"),
    '<a href="https://www.google.com" target="_blank">Link</a>',
  );
});

Deno.test(function codeblockTest() {
  assertEquals(
    convertMarkdownToHTML(
      `\`\`\`typescript
    const s: string = "text";
    console.log(s);
    \`\`\``,
    ),
    `<pre class="lang-typescript"><code>    const s: string = "text";
    console.log(s);
    </code></pre>`,
  );
});

Deno.test(function multilineTest() {
  assertEquals(
    convertMarkdownToHTML(
      `
    # Heading1 **bold**

    text **strong Hello**

    ## Heading2

    text *italic Hello*

    \`console.log("Hello, world!")\`

    [Link](https://www.google.com)

    \`\`\`typescript
    const s: string = "text";
    console.log(s);
    \`\`\`
    `,
    ),
    `<h1>Heading1 <strong>bold</strong></h1>    text <strong>strong Hello</strong>    <br><h2>Heading2</h2>    text <i>italic Hello</i>    <br><code>console.log("Hello, world!")</code>    <br><a href="https://www.google.com" target="_blank">Link</a>    <br><pre class="lang-typescript"><code>    const s: string = "text";
    console.log(s);
    </code></pre>`,
  );
});
