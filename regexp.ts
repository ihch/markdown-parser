export const heading_regexp = /^(?<level>#+)\s+(?<content>.+)/;

// inline
export const strong_regexp = /\*\*(?<content>.*)\*\*\s?/;
export const italic_regexp = /\*(?<content>.*)\*\s?/;
export const code_regexp = /`(?<content>.*)`\s?/;
