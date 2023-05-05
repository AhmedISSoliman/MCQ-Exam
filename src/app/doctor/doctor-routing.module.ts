import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.guard';
import { ExamComponent } from './components/exam/exam.component';
import { NewExamComponent } from './components/new-exam/new-exam.component';
import { ShowExamComponent } from './components/show-exam/show-exam.component';
import { StudentsComponent } from './components/students/students.component';
import { SubjectsComponent } from './components/subjects/subjects.component';

const routes: Routes = [
    {
        path: 'subjects',
        component: SubjectsComponent
    },
    {
        path: 'students',
        // canActivate: [AuthGuard],
        component: StudentsComponent
    },
    {
        path: 'new-exam',
        // canActivate: [AuthGuard],
        component: NewExamComponent
    },
    {
        path: 'exam-details/:id',
        // canActivate: [AuthGuard],
        component: ShowExamComponent
    }
    ,
    {
        path: 'exam/:id',
        // canActivate: [AuthGuard],
        component: ExamComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorRoutingModule { }
