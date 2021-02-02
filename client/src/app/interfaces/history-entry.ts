import { DefinitionElement } from './definition-element';

export interface HistoryEntry {
  isAI: boolean;
  word?: string | string[];
  definitions?: DefinitionElement[];
  points?: number | string;
  score: {
    computerScore: number | string;
    playerScore: number | string;
  };
  skip:
    | boolean
    | {
        isSwap: boolean;
      };
}
