import {
  code_regexp,
  heading_regexp,
  italic_regexp,
  strong_regexp,
} from "./regexp.ts";

export type Token =
  | TextToken
  | StrongToken
  | ItalicToken
  | CodeToken
  | HeadingToken;

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

function generateCodeToken(content: string): CodeToken {
  return { type: "CODE", content };
}

function generateHeadingToken(level: number, children: Token[]): HeadingToken {
  return { type: "HEADING", level, children };
}

export function tokenize(text: string): Token[] {
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
    } else if (currentChar === "`") {
      const code = text.match(code_regexp);
      if (code) {
        tokens.push(generateCodeToken(code.groups?.content || ""));
        skipIndex = code[0].length;
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
