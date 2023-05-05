import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from './../../services/doctor.service';
import { AuthService } from 'src/app/account/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  id: any;
  subject: any;
  total: number = 0;
  validExam: boolean = true;
  showResult: boolean = false;
  studentAnswers: any[] = [];
  studentId: any;
  studentData: any;
  subjects: any[] = [];

  constructor(
    private doctorService: DoctorService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');

  }
  getUserData() {
    this.authService.getUserData().subscribe(res => {
      console.log(res)
      this.studentId = res.userId;
      this.getUserInfo();
    })
  }
  getUserInfo() {
    this.authService.getUser('students', this.studentId).subscribe(res => {
      this.studentData = res;
      this.subjects = res.subjects ? res.subjects : [];
      this.checkValidExam();
    })
  }
  ngOnInit(): void {
    this.getUserData();
    this.getSubjectById();
  }
  getSubjectById() {
    this.doctorService.getSubjectById(this.id).subscribe(res => {
      this.subject = res
    })
  }

  getAnswer(event: any) {
    this.subject.questions[event.source.name]['studenAnswer'] = event.value;
  }
  getResult() {
    this.total = 0;
    for (let i = 0; i < this.subject.questions.length; i++) {
      if (this.subject.questions[i].correctAnswer === this.subject.questions[i].studenAnswer) {
        this.total++;
      }
    }
    this.showResult = true;
    if (this.checkValidExam()) {
      this.subjects.push({
        name: this.subject.name,
        degree: this.total,
        id: this.id,
      })
      const model = {
        ...this.studentData,
        subjects: this.subjects
      }
      this.doctorService.updateStudent(model, this.studentData.id).subscribe(res => {
        this.toastr.success(this.translate.instant("ResultAddedSuccessfully"), this.translate.instant('Success'))
      })

    }
    else {

      return;
    }


  }
  checkValidExam() {
    let exist = this.subjects.find(subject => this.id == subject.id)
    if (exist) {
      this.total = exist.degree;
      this.validExam = false;
      this.showResult = true;
      return false;
    }
    else {
      return true
    }
  }

}

