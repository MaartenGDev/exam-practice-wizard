import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SummaryOption, SummaryOptionStatus } from "../_models/question.model";

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.scss']
})
export class MultipleChoiceQuestionComponent {
  @Input()
  options: string[] = [];
  @Output()
  optionSelected = new EventEmitter<string>();
  @Input()
  disabled = false;
  @Input()
  summaryOptions: SummaryOption[] = [];

  selectedOptionChange(option: string){
    this.optionSelected.next(option);
  }

  getSummaryOption(option: string){
    return this.summaryOptions.find(o => o.value === option);
  }

  isChecked(option: string): boolean {
    return !!this.getSummaryOption(option);
  }

  showAsCorrect(option: string) {
    const associatedSummaryOption = this.getSummaryOption(option);

    if(!associatedSummaryOption){
      return false;
    }

    return associatedSummaryOption.status === SummaryOptionStatus.correct;
  }

  showAsIncorrect(option: string) {
    const associatedSummaryOption = this.getSummaryOption(option);

    if(!associatedSummaryOption){
      return false;
    }

    return associatedSummaryOption.status === SummaryOptionStatus.incorrect;
  }

  showAsMissing(option: string) {
    const associatedSummaryOption = this.getSummaryOption(option);

    if(!associatedSummaryOption){
      return false;
    }

    return associatedSummaryOption.status === SummaryOptionStatus.missing;
  }
}
