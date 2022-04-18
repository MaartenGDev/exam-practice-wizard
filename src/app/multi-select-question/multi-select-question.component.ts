import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { QuestionOption, SummaryOption, SummaryOptionStatus } from "../_models/question.model";

@Component({
  selector: 'app-multi-select-question',
  templateUrl: './multi-select-question.component.html',
  styleUrls: ['./multi-select-question.component.scss']
})
export class MultiSelectQuestionComponent implements OnChanges {
  @Input()
  options: QuestionOption[] = [];
  @Input()
  correctAmountOfOptions = 2;
  @Input()
  disabled = false;
  @Input()
  summaryOptions: SummaryOption[] = [];

  selectedOptions: QuestionOption[] = [];

  @Output()
  allOptionsSelected = new EventEmitter<QuestionOption[]>();

  optionChecked(changedOption: QuestionOption, checked: boolean) {
    if(checked){
      this.selectedOptions.push(changedOption);
    }else{
      this.selectedOptions = this.selectedOptions.filter(o => o.value !== changedOption.value);
    }

    if(this.selectedOptions.length === this.correctAmountOfOptions){
      this.allOptionsSelected.next(this.selectedOptions);
    }
  }

  getSummaryOption(option: string){
    return this.summaryOptions.find(o => o.option.value === option);
  }

  isChecked(option: QuestionOption): boolean {
    return this.selectedOptions.includes(option) || !!this.getSummaryOption(option.value);
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

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['options']) {
      this.selectedOptions = [];
    }
  }
}
