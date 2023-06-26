import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { convertMarkdownToHTML } from "./main.ts";

Deno.test(function parseTest() {
  assertEquals(convertMarkdownToHTML("Markdown"), "<p>Markdown</p>");
});

Deno.test(function headingTest() {
  assertEquals(convertMarkdownToHTML("# Markdown"), "<h1>Markdown</h1>");
  assertEquals(convertMarkdownToHTML("## Markdown"), "<h2>Markdown</h2>");
  assertEquals(convertMarkdownToHTML("### Markdown"), "<h3>Markdown</h3>");
  assertEquals(convertMarkdownToHTML("#### Markdown"), "<h4>Markdown</h4>");
});

Deno.test(function multilineTest() {
  assertEquals(convertMarkdownToHTML(
    `
    # Heading1

    text

    ## Heading2

    text
    `
  ), "<h1>Heading1</h1><p>text</p><h2>Heading2</h2><p>text</p>");
});
