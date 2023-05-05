import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/account/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  StudentsList: any[];
  displayedColumns: any = ['No.', 'name', 'subjectName', 'degree'];
  dataTable: any[];
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.getStudenstDetails()

  }
  getStudenstDetails() {
    this.auth.getAllUsers('students').subscribe(res => {
      console.log(res)
      this.StudentsList = res.map((items: any) => {
        if (items?.subjects) {
          return items?.subjects?.map((subItems: any) => {
            return {
              name: items.userName,
              subjectName: subItems.name,
              degree: subItems.degree
            }
          })
        }
        else {
          return [{
            name: items.userName,
          }]
        }
      })
      this.dataTable = this.StudentsList.flat();
      console.log(this.dataTable)
    })
  }
}
