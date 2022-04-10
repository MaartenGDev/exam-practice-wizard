import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SummaryOption, SummaryOptionStatus } from "../_models/question.model";

@Component({
  selector: 'app-multi-select-question',
  templateUrl: './multi-select-question.component.html',
  styleUrls: ['./multi-select-question.component.scss']
})
export class MultiSelectQuestionComponent implements OnInit {
  @Input()
  options: string[] = [];
  @Input()
  correctAmountOfOptions = 2;
  @Input()
  disabled = false;
  @Input()
  summaryOptions: SummaryOption[] = [];

  selectedOptions: string[] = [];

  @Output()
  allOptionsSelected = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  optionChecked(optionValue: string, checked: boolean) {
    if(checked){
      this.selectedOptions.push(optionValue);
    }else{
      this.selectedOptions = this.selectedOptions.filter(o => o !== optionValue);
    }

    if(this.selectedOptions.length === this.correctAmountOfOptions){
      this.allOptionsSelected.next(this.selectedOptions);
    }
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
