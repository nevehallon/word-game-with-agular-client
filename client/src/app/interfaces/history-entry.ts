export interface HistoryEntry {
  isAI: boolean;
  word?: string | string[];
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
