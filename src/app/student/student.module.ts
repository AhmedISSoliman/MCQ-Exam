import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './components/exam/exam.component';
import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ExamComponent
  ],
  imports: [
    StudentRoutingModule,
    SharedModule
  ],
  exports: [
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
