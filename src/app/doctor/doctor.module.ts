import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewExamComponent } from './components/new-exam/new-exam.component';
import { StudentsComponent } from './components/students/students.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { MatrialModule } from '../shared-material/shared-material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ExamComponent } from './components/exam/exam.component';
import { ShowExamComponent } from './components/show-exam/show-exam.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    NewExamComponent,
    StudentsComponent,
    SubjectsComponent,
    ExamComponent,
    ShowExamComponent,
  ],
  imports: [
    DoctorRoutingModule,
    SharedModule,
    TranslateModule
  ],
  exports: [
    DoctorRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class DoctorModule { }
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
