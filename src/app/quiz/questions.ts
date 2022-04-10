import { Question } from "../_models/question.model";

export const EXAM_QUESTIONS: Question[] = [
  {
    question: "How many legs does a cow have?",
    options: ['4', '2', '3'],
    correctOptions: ['4'],
    explanation: 'It has 4 legs so it can walk'
  },
  {
    question: "How many days does a week have?",
    options: ['7', '5', '6'],
    correctOptions: ['5', '7'],
    explanation: '7 days, that is how the romans decided it should be'
  }
];
