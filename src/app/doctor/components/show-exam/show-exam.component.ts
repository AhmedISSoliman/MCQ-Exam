import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from './../../services/doctor.service';
import { AuthService } from './../../../account/services/auth.service';

@Component({
  selector: 'app-show-exam',
  templateUrl: './show-exam.component.html',
  styleUrls: ['./show-exam.component.scss']
})
export class ShowExamComponent implements OnInit {
  id: any;
  subject: any;
  user: any
  constructor(
    private doctorService: DoctorService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');

  }
  ngOnInit(): void {
    this.getSubjectById();
    this.authService.userDataSubject.subscribe(res => {
      this.user = res
    })
  }
  getSubjectById() {
    this.doctorService.getSubjectById(this.id).subscribe(res => {
      this.subject = res
    })
  }
  delete(index: any) {
    this.subject.questions.splice(index, 1);
    const model = {
      name: this.subject.name,
      questions: this.subject.questions
    }
    this.doctorService.updateQuestions(model, this.id).subscribe(res => {

    })
    console.log(index)
  }
}
