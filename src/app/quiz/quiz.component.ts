import { Component, OnInit } from '@angular/core';
import { Question, QuestionAnswer, QuestionOption } from "../_models/question.model";
import { EXAM_QUESTIONS } from "./questions";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  questionAnswers: QuestionAnswer[] = [];
  currentQuestionIndex = 0;

  shuffledCurrentQuestionOptions: QuestionOption[] = [];

  showExplanation = false;
  hasAnsweredCorrectly = false;

  showSummary = false;

  constructor() { }

  ngOnInit(): void {
    this.questions = this.getAsShuffledArray(EXAM_QUESTIONS);
    this.shuffledCurrentQuestionOptions = this.getAsShuffledArray(this.questions[this.currentQuestionIndex].options);
  }

  optionsSelected(selectedOptions: QuestionOption[]) {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    if(selectedOptions.length !== this.questions[this.currentQuestionIndex].correctOptions.length){
      return;
    }

    this.showExplanation = true;
    this.hasAnsweredCorrectly = currentQuestion.correctOptions
      .every(correctOption => selectedOptions.some(so => so.value === correctOption));

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
    this.shuffledCurrentQuestionOptions = this.getAsShuffledArray<QuestionOption>(this.questions[this.currentQuestionIndex].options);
  }

  restartQuiz() {
    this.showSummary = false;
    this.showExplanation = false;
    this.hasAnsweredCorrectly = false;

    this.currentQuestionIndex = 0;
    this.questionAnswers = [];
  }

  getFormattedCorrectOptions(question: Question) {
    return question.correctOptions.join(', ')
  }

  getAsShuffledArray<T>(array: T[]) {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }
}
