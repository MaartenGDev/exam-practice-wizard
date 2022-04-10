export interface Question {
  question: string;
  options: QuestionOption[];
  correctOptions: string[];
  explanation: string;
}

export interface QuestionOption {
  value: string;
  label: string;
}

export interface QuestionAnswer {
  question: Question;
  selectedOptions: QuestionOption[];
}

export interface SummaryOption {
  option: QuestionOption;
  status: SummaryOptionStatus;
}

export enum SummaryOptionStatus {
  correct,
  incorrect,
  missing
}
