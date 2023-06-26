import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { convertMarkdownToHTML } from "./main.ts";

Deno.test(function parseTest() {
  assertEquals(convertMarkdownToHTML("Markdown"), "<p>Markdown</p>");
});
