import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiPaths } from 'src/environments/urls';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }
  createQuestionSubject(model: any) {
    return this.http.post<any>(`${environment.baseUrl}${ApiPaths.Questions}`, model);
  }
  getAllSubjects() {
    return this.http.get<any>(`${environment.baseUrl}${ApiPaths.Questions}`)
  }
  deleteSubject(id: any) {
    return this.http.delete<any>(`${environment.baseUrl}${ApiPaths.DeletQuestion}${id}`)
  }
  updateQuestions(model: any, id: any) {
    return this.http.put<any>(`${environment.baseUrl}${ApiPaths.Questions}/${id}`, model);
  }
  getSubjectById(subjectId: any) {
    return this.http.get<any>(`${environment.baseUrl}${ApiPaths.Questions}/${subjectId}`)
  }
  // updateSubject(subjectId:any,data:any) {
  //   return this.http.put<any>(`${environment.baseUrl}${ApiPaths.Questions}/${subjectId}`,data)
  // }

  updateStudent(model: any, studentId: any) {
    return this.http.put<any>(`${environment.baseUrl}${ApiPaths.Students}/${studentId}`, model)
  }
}
