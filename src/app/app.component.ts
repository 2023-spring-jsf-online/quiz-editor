import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: String,
  quizQuestions: QuestionDisplay[]
}

interface QuestionDisplay {
  questionName: String
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  constructor(
    public quizSvc: QuizService
  ) {

  }

  ngOnInit(): void {
      const quizzes = this.quizSvc.loadQuizzes();
      console.log(quizzes);

      this.quizzes =  quizzes.map(x => ({
        quizName: x.name,
        quizQuestions: x.questions.map((y: any) => ({
          questionName: y.name
        }))
      }));

      console.log(this.quizzes)
  }

  quizzes: QuizDisplay[] = [];

  selectedQuiz: QuizDisplay | undefined = undefined;

  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;
    this.addNewQuizFormOpened = false;
    this.updateQuizFormOpened = false;
    console.log(this.selectedQuiz);
  }

  addNewQuizFormOpened = false;

  openAddNewQuizForm = () => {
    this.selectedQuiz = undefined;
    this.addNewQuizFormOpened = true;
    this.updateQuizFormOpened = false;
  }

  newQuizName = "";
  newQuizQuestion = "";

  addNewForm = () => {
    this.quizzes.push({
      quizName: this.newQuizName,
      quizQuestions: [
        {questionName: this.newQuizQuestion}
      ]
    })
    console.log(this.quizzes);
    this.addNewQuizFormOpened = false;
  }

  updateQuizFormOpened = false;

  updateQuizForm = () => {
    this.addNewQuizFormOpened = false;
    this.updateQuizFormOpened = true;
  }

  newQuizNameUpdated = "";

  updateQuiz = (selectedQuiz: QuizDisplay) => {
    let index = this.quizzes.indexOf(selectedQuiz);

    this.quizzes[index].quizName = this.newQuizNameUpdated;
    this.updateQuizFormOpened = false;
  }
}
