import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { QuestionAnswer, SummaryOption, SummaryOptionStatus } from "../_models/question.model";

@Component({
  selector: 'app-quiz-summary',
  templateUrl: './quiz-summary.component.html',
  styleUrls: ['./quiz-summary.component.scss']
})
export class QuizSummaryComponent implements OnChanges {
  @Input()
  answers: QuestionAnswer[] = [];

  @Output()
  restartQuiz = new EventEmitter<void>();

  constructor() { }

  public isAnsweredCorrectly(questionAnswer: QuestionAnswer){
    return questionAnswer.question.correctOptions.every(option => questionAnswer.selectedOptions.includes(option));
  }

  getAmountOfCorrectQuestions() {
    return this.answers.filter(a => this.isAnsweredCorrectly(a)).length;
  }

  getAsSummaryOptions(answer: QuestionAnswer) {
    const wronglySelectedOptions: SummaryOption[] = answer.selectedOptions
      .filter(o => !answer.question.correctOptions.includes(o))
      .map(o => ({value: o, status: SummaryOptionStatus.incorrect}));

    const correctlySelectedOptions = answer.selectedOptions
      .filter(o => answer.question.correctOptions.includes(o))
      .map(o => ({value: o, status: SummaryOptionStatus.correct}));

    const missingSelectedOptions = answer.question.correctOptions
      .filter(o => !answer.selectedOptions.includes(o))
      .map(o => ({value: o, status: SummaryOptionStatus.missing}));


    return [
      ...wronglySelectedOptions,
      ...correctlySelectedOptions,
      ...missingSelectedOptions,
    ];
  }

  restart() {
    this.restartQuiz.next();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
