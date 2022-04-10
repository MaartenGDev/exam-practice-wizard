export interface Question {
  question: string;
  options: string[];
  correctOptions: string[];
  explanation: string;
}

export interface QuestionAnswer {
  question: Question;
  selectedOptions: string[];
}

export interface SummaryOption {
  value: string;
  status: SummaryOptionStatus;
}

export enum SummaryOptionStatus {
  correct,
  incorrect,
  missing
}
