export interface DefinitionElement {
  [key: string]: {
    definition?: string;
    partOfSpeech?: string;
    synonyms?: string[];
    typeOf?: string[];
    hasTypes?: string[];
    examples?: string[];
    partOf?: string[];
    derivation?: string[];
  }[];
}
