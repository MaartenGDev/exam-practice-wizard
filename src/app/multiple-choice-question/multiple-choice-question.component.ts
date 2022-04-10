import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionOption, SummaryOption, SummaryOptionStatus } from "../_models/question.model";

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.scss']
})
export class MultipleChoiceQuestionComponent {
  @Input()
  options: QuestionOption[] = [];
  @Output()
  optionSelected = new EventEmitter<QuestionOption>();
  @Input()
  disabled = false;
  @Input()
  summaryOptions: SummaryOption[] = [];

  selectedOptionChange(optionValue: string){
    this.optionSelected.next(this.options.find(o => o.value === optionValue)!);
  }

  getSummaryOption(option: string){
    return this.summaryOptions.find(so => so.option.value === option);
  }

  isChecked(option: QuestionOption): boolean {
    return !!this.getSummaryOption(option.value);
  }

  showAsCorrect(option: QuestionOption) {
    const associatedSummaryOption = this.getSummaryOption(option.value);

    if(!associatedSummaryOption){
      return false;
    }

    return associatedSummaryOption.status === SummaryOptionStatus.correct;
  }

  showAsIncorrect(option: QuestionOption) {
    const associatedSummaryOption = this.getSummaryOption(option.value);

    if(!associatedSummaryOption){
      return false;
    }

    return associatedSummaryOption.status === SummaryOptionStatus.incorrect;
  }

  showAsMissing(option: QuestionOption) {
    const associatedSummaryOption = this.getSummaryOption(option.value);

    if(!associatedSummaryOption){
      return false;
    }

    return associatedSummaryOption.status === SummaryOptionStatus.missing;
  }
}
