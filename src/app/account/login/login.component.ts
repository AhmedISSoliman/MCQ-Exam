import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isFormSubmitted: boolean = false;
  allusers: any[];
  userType: string = 'students';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tostrService: ToastrService,
    private translateService: TranslateService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      type: [this.userType, [Validators.required]],
    });
  }

  getRole(event: any) {
    this.userType = event.value;
    this.getAllUsers();
  }
  getAllUsers() {
    this.authService.getAllUsers(this.userType).subscribe(res => {
      this.allusers = res;
    })
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm.invalid) return;

    let userExist = this.allusers.find(user =>
      user.email == this.loginForm.value.email && user.password === this.loginForm.value.password
    )
    if (userExist) {
      const model = {
        userName: userExist.userName,
        role: this.userType,
        userId: userExist.id
      }
      this.authService.login(model).subscribe((res: any) => {
        this.authService.userDataSubject.next(res);
        this.tostrService.success(this.translateService.instant('LoginSuccess'), this.translateService.instant('Success'));
        this.router.navigate(['/subjects']);
      })
    }
    else {
      this.tostrService.error(this.translateService.instant('ThisEmailNotFound'), this.translateService.instant('Error'))
    }
  }

}
