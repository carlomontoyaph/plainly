export interface RedFlag {
  flag: string;
  quote: string;
}

export interface AnalysisResult {
  docLabel: string;
  docType: string;
  summary: string[];
  requires: string[];
  redFlags: RedFlag[];
  mistakes: string[];
}

export type View = 'landing' | 'results';
export type Level = 1 | 2 | 3;
