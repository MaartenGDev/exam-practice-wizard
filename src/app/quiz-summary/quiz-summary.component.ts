import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { QuestionAnswer, SummaryOption, SummaryOptionStatus } from "../_models/question.model";

@Component({
  selector: 'app-quiz-summary',
  templateUrl: './quiz-summary.component.html',
  styleUrls: ['./quiz-summary.component.scss']
})
export class QuizSummaryComponent{
  @Input()
  answers: QuestionAnswer[] = [];

  @Output()
  restartQuiz = new EventEmitter<void>();

  constructor() { }

  public isAnsweredCorrectly(questionAnswer: QuestionAnswer){
    return questionAnswer.question.correctOptions
      .every(option => questionAnswer.selectedOptions.some(so => so.value === option));
  }

  getAmountOfCorrectQuestions() {
    return this.answers.filter(a => this.isAnsweredCorrectly(a)).length;
  }

  getAsSummaryOptions(answer: QuestionAnswer): SummaryOption[] {
    const wronglySelectedOptions: SummaryOption[] = answer.selectedOptions
      .filter(o => !answer.question.correctOptions.includes(o.value))
      .map(o => ({option: o, status: SummaryOptionStatus.incorrect}));

    const correctlySelectedOptions: SummaryOption[] = answer.selectedOptions
      .filter(o => answer.question.correctOptions.includes(o.value))
      .map(o => ({option: o, status: SummaryOptionStatus.correct}));

    const missingSelectedOptions: SummaryOption[] = answer.question.correctOptions
      .filter(o => !answer.selectedOptions.some(so => so.value === o))
      .map(optionValue => {
        const option = answer.question.options.find(optionDetails => optionDetails.value === optionValue)!;
        return ({option: option, status: SummaryOptionStatus.missing})
      });


    return [
      ...wronglySelectedOptions,
      ...correctlySelectedOptions,
      ...missingSelectedOptions,
    ];
  }

  restart() {
    this.restartQuiz.next();
  }
}
