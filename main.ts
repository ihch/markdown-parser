const heading_regexp = /^(?<level>#+)\s+(?<content>.+)/;

// inline
const strong_regexp = /\s\*\*(?<content>.*)\*\*\s?/;
const italic_regexp = /\s\*(?<content>.*)\*\s?/;

// multiline
// const codeblock_regexp = //;

type Token = TextToken | StrongToken | ItalicToken | HeadingToken;

type TextToken = {
  type: "TEXT";
  content: string;
};

type StrongToken = {
  type: "STRONG";
  content: string;
};

type ItalicToken = {
  type: "ITALIC";
  content: string;
};

type HeadingToken = {
  type: "HEADING";
  level: number;
  children: Token[];
};

function generateTextToken(content: string): TextToken {
  return { type: "TEXT", content };
}

function generateStrongToken(content: string): StrongToken {
  return { type: "STRONG", content };
}

function generateItalicToken(content: string): ItalicToken {
  return { type: "ITALIC", content };
}

function generateHeadingToken(level: number, children: Token[]): HeadingToken {
  return { type: "HEADING", level, children };
}

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let vanillaText = "";

  for (let index = 0; index < text.length; index++) {
    const currentChar = text[index];
    let skipIndex = 0;

    if (currentChar === "#") {
      const heading = text.trim().match(heading_regexp);
      if (heading) {
        tokens.push(generateHeadingToken(
          heading.groups?.level.length || 1,
          tokenize(heading.groups?.content || ""),
        ));
        skipIndex += heading[0].length;
      }
    } else if (currentChar === "*") {
      if (vanillaText !== "") {
        tokens.push(generateTextToken(vanillaText));
        vanillaText = "";
      }

      const strong = text.match(strong_regexp);
      const italic = text.match(italic_regexp);

      if (strong) {
        tokens.push(generateStrongToken(strong.groups?.content || ""));
        skipIndex += strong[0].length;
      } else if (italic) {
        tokens.push(generateItalicToken(italic.groups?.content || ""));
        skipIndex += italic[0].length;
      }
    } else {
      vanillaText += currentChar;
    }

    if (skipIndex) {
      text = text.slice(index + skipIndex);
      index = 0;
    }
  }

  if (vanillaText !== "") {
    tokens.push(generateTextToken(vanillaText));
    vanillaText = "";
  }

  return tokens;
}

function parse(markdown: string): Token[] {
  const ast = tokenize(markdown);

  return ast;
}

function renderHTML(ast: Token[]): string {
  const html = ast.reduce(
    (prev, cur) => {
      if (cur.type === 'TEXT') {
        return prev + `${cur.content}`;
      }
      if (cur.type === 'STRONG') {
        return prev + `<strong>${cur.content}</strong>`;
      }
      if (cur.type === 'ITALIC') {
        return prev + `<i>${cur.content}</i>`;
      }
      if (cur.type === 'HEADING') {
        return prev + `<h${cur.level}>${renderHTML(cur.children)}</h${cur.level}>`;
      }
      return prev;
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
    # Heading1 **bold**

    text **strong Hello**

    ## Heading2

    text *italic Hello*
    `;
  const result = convertMarkdownToHTML(markdown);
  console.log(result);
}
