import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../account/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { DoctorService } from './../../services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  userData: any;
  subjects: any[];
  constructor
    (
      private authService: AuthService,
      private translateService: TranslateService,
      private doctorService: DoctorService,
      private router: Router
    ) {

  }

  ngOnInit(): void {
    this.getAllSubjects();
    this.authService.userDataSubject.subscribe(res => {
      this.userData = res;
    })
  }
  delete(index: any) {
    this.doctorService.deleteSubject(index).subscribe(res => {
      this.getAllSubjects();
    })
    console.log(index)
  }
  getAllSubjects() {
    this.doctorService.getAllSubjects().subscribe(res => {
      this.subjects = res;
    })
  }
  navigateToExam(id: any) {
    this.router.navigate(['/exam/' + id])
  }
  navigateToExamDetails(id: any) {
    this.router.navigate(['/exam-details/' + id])
  }
}
