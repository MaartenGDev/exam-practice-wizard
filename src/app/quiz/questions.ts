import { Question } from "../_models/question.model";

export const EXAM_QUESTIONS: Question[] = [
  {
    question: "What colors does a traffic light have?",
    options: [
      {
        value: 'A',
        label: 'Purple'
      },
      {
        value: 'B',
        label: 'Red'
      },
      {
        value: 'C',
        label: 'Orange'
      },
      {
        value: 'D',
        label: 'Yellow'
      },
      {
        value: 'E',
        label: 'Blue'
      },
      {
        value: 'F',
        label: 'Green'
      }
    ],
    correctOptions: ['B', 'D', 'F'],
    explanation: 'A traffic light in the Netherlands goes from Red to Green and from Green to Orange to Red.'
  }
];
