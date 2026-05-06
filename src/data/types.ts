export type ConsonantClass = "mid" | "high" | "low";

export type FinalSound =
  | "k"
  | "t"
  | "p"
  | "n"
  | "m"
  | "ng"
  | "y"
  | "w"
  | "none";

export interface Consonant {
  id: string;
  letter: string;
  name: string;
  nameRoman: string;
  meaning: string;
  romanInitial: string;
  finalSound: FinalSound;
  class: ConsonantClass;
  obsolete?: boolean;
}

export type VowelCategory =
  | "monophthong"
  | "diphthong"
  | "special";

export interface Vowel {
  id: string;
  form: string;
  display: string;
  roman: string;
  length: "short" | "long";
  category: VowelCategory;
  inherentTone?: "mid" | "low" | "falling" | "high" | "rising";
  notes?: string;
}

export type ToneName = "mid" | "low" | "falling" | "high" | "rising";

export type ToneMark = "none" | "ek" | "tho" | "tri" | "chattawa";
