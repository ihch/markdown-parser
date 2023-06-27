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
    "<pre>console.log('Hello, world!')</pre>",
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

    \`console.log("Hello, world!")\``
    ),
    `<h1>Heading1 <strong>bold</strong></h1>
    text <strong>strong Hello</strong><h2>Heading2</h2>    
    text <i>italic Hello</i><pre>console.log("Hello, world!")</pre>    `,
  );
});
