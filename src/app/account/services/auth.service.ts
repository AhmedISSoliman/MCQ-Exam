import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiPaths } from 'src/environments/urls';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDataSubject = new BehaviorSubject<any>({});
  constructor(private http: HttpClient, private router: Router) { }

  register(formData: any) {
    return this.http.post(`${environment.baseUrl}${ApiPaths.Students}`, formData)
  }
  login(formData: any) {
    return this.http.put(`${environment.baseUrl}${ApiPaths.Login}/1`, formData)
  }

  getAllUsers(userType: string) {
    return this.http.get<any>(`${environment.baseUrl}${userType}`)
  }
  getUser(userType: string, id: any) {
    return this.http.get<any>(`${environment.baseUrl}${userType}/${id}`)
  }
  getUserData() {
    return this.http.get<any>(`${environment.baseUrl}${ApiPaths.Login}/1`);
  }
  logout(data: any) {
    this.userDataSubject.next(null)
    this.router.navigate(['login']);
    return this.http.put(`${environment.baseUrl}${ApiPaths.Login}/1`, data)
  }
}
