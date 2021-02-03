export interface Definition {
  word?: DefinitionElement;
}

export interface Score {
  computerScore?: number | string;
  playerScore?: number | string;
}

export interface HistoryEntry {
  isAI?: boolean;
  word?: string;
  definitions?: Definition[];
  points?: number | string;
  score?: Score;
  skip?:
    | boolean
    | {
        isSwap?: boolean;
      };
}

export interface DefinitionElement {
  [key: string]: {
    definition?: string[];
    partOfSpeech?: string[];
    synonyms?: string[];
    typeOf?: string[];
    hasTypes?: string[];
    examples?: string[];
    partOf?: string[];
    derivation?: string[];
    verbGroup?: string[];
    also?: string[];
    inCategory?: string[];
  };
}
