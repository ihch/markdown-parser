import {
  anchor_regexp,
  code_regexp,
  codeblock_regexp,
  heading_regexp,
  italic_regexp,
  strong_regexp,
} from "./regexp.ts";

export type Token =
  | TextToken
  | StrongToken
  | ItalicToken
  | CodeToken
  | AnchorToken
  | HeadingToken
  | CodeblockToken;

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

type CodeToken = {
  type: "CODE";
  content: string;
};

type AnchorToken = {
  type: "ANCHOR";
  content: string;
  href: string;
};

type HeadingToken = {
  type: "HEADING";
  level: number;
  children: Token[];
};

type CodeblockToken = {
  type: "CODEBLOCK";
  language: string;
  content: string;
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

function generateCodeToken(content: string): CodeToken {
  return { type: "CODE", content };
}

function generateAnchorToken(content: string, href: string): AnchorToken {
  return { type: "ANCHOR", content, href };
}

function generateHeadingToken(level: number, children: Token[]): HeadingToken {
  return { type: "HEADING", level, children };
}

function generateCodeblockToken(
  language: string,
  content: string,
): CodeblockToken {
  return { type: "CODEBLOCK", language, content };
}

export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let vanillaText = "";

  for (let index = 0; index < text.length; index++) {
    const currentChar = text[index];
    let skipIndex = 0;

    if (currentChar === "#") {
      if (vanillaText !== "") {
        vanillaText.split('\n').forEach((text) => tokens.push(generateTextToken(text)));
        vanillaText = "";
      }

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
        vanillaText.split('\n').forEach((text) => tokens.push(generateTextToken(text)));
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
    } else if (currentChar === "`") {
      if (vanillaText !== "") {
        vanillaText.split('\n').forEach((text) => tokens.push(generateTextToken(text)));
        vanillaText = "";
      }

      if (text[index + 1] === "`" && text[index + 2] === "`") {
        const codeblock = text.match(codeblock_regexp);
        if (codeblock) {
          tokens.push(
            generateCodeblockToken(
              codeblock.groups?.language || "",
              codeblock.groups?.content || "",
            ),
          );
          skipIndex = codeblock.input?.length || codeblock[0].length;
        }
      } else {
        const code = text.match(code_regexp);
        if (code) {
          tokens.push(generateCodeToken(code.groups?.content || ""));
          skipIndex = code[0].length;
        }
      }
    } else if (currentChar === "[") {
      if (vanillaText !== "") {
        vanillaText.split('\n').forEach((text) => tokens.push(generateTextToken(text)));
        vanillaText = "";
      }

      const anchor = text.match(anchor_regexp);
      if (anchor) {
        tokens.push(
          generateAnchorToken(
            anchor.groups?.content || "",
            anchor.groups?.href || "",
          ),
        );
        skipIndex = anchor[0].length;
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
    vanillaText.split('\n').forEach((text) => tokens.push(generateTextToken(text)));
    vanillaText = "";
  }

  return tokens;
}
