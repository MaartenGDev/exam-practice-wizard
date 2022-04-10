import { Component, OnInit } from '@angular/core';
import { Question, QuestionAnswer } from "../_models/question.model";
import { EXAM_QUESTIONS } from "./questions";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  questions: Question[] = EXAM_QUESTIONS;
  questionAnswers: QuestionAnswer[] = [];
  currentQuestionIndex = 0;

  showExplanation = false;
  hasAnsweredCorrectly = false;

  showSummary = false;

  constructor() { }

  ngOnInit(): void {
  }

  optionsSelected(selectedOptions: string[]) {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    if(selectedOptions.length !== this.questions[this.currentQuestionIndex].correctOptions.length){
      return;
    }

    this.showExplanation = true;
    this.hasAnsweredCorrectly = currentQuestion.correctOptions.every(option => selectedOptions.includes(option));

    this.questionAnswers.push({
      question: this.questions[this.currentQuestionIndex],
      selectedOptions: selectedOptions
    });
  }

  nextQuestion() {
    this.showExplanation = false;
    this.hasAnsweredCorrectly = false;

    const hasAnsweredLastQuestion = this.currentQuestionIndex === (this.questions.length - 1);

    if(hasAnsweredLastQuestion){
      this.showSummary = true;
      return;
    }

    this.currentQuestionIndex++;
  }

  restartQuiz() {
    this.showSummary = false;
    this.showExplanation = false;
    this.hasAnsweredCorrectly = false;

    this.currentQuestionIndex = 0;
    this.questionAnswers = [];
  }
}
