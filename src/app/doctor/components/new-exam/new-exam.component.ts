import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { DoctorService } from './../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {
  isFormSubmitted: boolean = false;

  subjectNameForm: FormGroup;
  questionsForm: FormGroup;
  questions: any[] = [];


  subjectName: string = '';
  preview: boolean = false;
  startFirst: boolean = false;
  correctAnswer: any;
  selectedIndex = 0;
  id: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private doctorService: DoctorService
  ) {
  }

  ngOnInit(): void {
    this.subjectNameForm = this.formBuilder.group({
      subjectNameControl: ['', Validators.required],
    });
    this.questionsForm = this.formBuilder.group({
      question: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
    });
  }
  getCorrect(event: any) {
    this.correctAnswer = event.value;
  }
  start() {
    if (this.subjectNameForm.value.subjectNameControl == '') {
      this.toastr.error(this.translateService.instant('PleaseEnterSubjectName'), this.translateService.instant('Error'));
    }
    else {
      this.startFirst = true;
      this.subjectName = this.subjectNameForm.value.subjectNameControl;
      this.selectedIndex = 1
    }
  }
  clearForm() {
    this.questionsForm.reset();
  }
  cancel() {
    this.subjectName = '';
    this.questionsForm.reset();
    this.subjectNameForm.reset();
    this.questions = [];
  }

  saveQuestion() {
    if (this.correctAnswer) {
      const model = {
        question: this.questionsForm.value.question,
        answer1: this.questionsForm.value.answer1,
        answer2: this.questionsForm.value.answer2,
        answer3: this.questionsForm.value.answer3,
        answer4: this.questionsForm.value.answer4,
        correctAnswer: this.questionsForm.value[this.correctAnswer]
      }
      this.questions?.push(model);
      this.questionsForm.reset();
    }
    else {
      this.toastr.error(this.translateService.instant('PleaseSelectCorrectAnswer'), this.translateService.instant('Error'))
    }
  }
  submit() {
    const model = {
      name: this.subjectNameForm.value.subjectNameControl,
      questions: this.questions
    }
    if (this.preview) {
      this.selectedIndex = 2
    }
    else {
      this.doctorService.createQuestionSubject(model).subscribe(res => {
        this.preview = true;
        this.id = res.id
      })
    }
  }
  delete(i: any) {
    this.questions.splice(i, 1);
    const model = {
      name: this.subjectNameForm.value.subjectNameControl,
      questions: this.questions
    }
    this.doctorService.updateQuestions(model, this.id).subscribe(res => {
      console.log(res)
    })
    // this.doctorService.deleteQuestion(this.id).subscribe(res => {

    // })
  }
}

