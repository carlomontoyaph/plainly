// File parsing limits
export const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
export const MAX_PDF_PAGES = 40;

// API analysis limits
export const ANALYSIS_CHAR_LIMIT = 6000;
export const MAX_TOKENS = 1024;
export const OPENAI_MODEL = 'gpt-4o-mini';

// 1-indexed Record matching the Level type — avoids [level - 1] arithmetic in components
export const LEVEL_LABELS: Record<number, string> = {
  1: 'Simplest',
  2: 'Plain English',
  3: 'Detailed',
};

export const LEVEL_BLURBS: Record<number, string> = {
  1: 'Everyday words, short sentences — like a friend explaining it.',
  2: 'Clear plain English for any adult reader.',
  3: 'Thorough, with specifics and section references.',
};
