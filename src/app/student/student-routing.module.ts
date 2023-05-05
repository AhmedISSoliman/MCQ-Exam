import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewExamComponent } from '../doctor/components/new-exam/new-exam.component';

const routes: Routes = [
    {
        path: '',
        component: NewExamComponent,

    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule { }
