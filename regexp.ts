export const heading_regexp = /^(?<level>#+)\s+(?<content>.+)/;

// inline
export const strong_regexp = /\*\*(?<content>.*)\*\*\s?/;
export const italic_regexp = /\*(?<content>.*)\*\s?/;
export const code_regexp = /`(?<content>.*)`\s?/;
export const anchor_regexp = /\[(?<content>.*)\]\((?<href>.*)\)\s?/;

// block
export const codeblock_regexp = /```(?<language>.*)\n(?<content>[\s\S]*)```\n?/;
