import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isFormSubmitted: boolean = false;
  allusers: any[];
  userType: string = 'students'
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tostrService: ToastrService,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllStudents();
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    }, {
      validator: [
        this.mustMatch('password', 'confirmPassword')
      ]
    });
  }
  getAllStudents() {
    this.authService.getAllUsers(this.userType).subscribe(res => {
      this.allusers = res;
    })
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.registerForm.invalid) return;
    let userExist = this.allusers.find(user => user.email == this.registerForm.value.email);
    if (userExist) {
      this.tostrService.error(this.translateService.instant('ThisEmailAlreadyExist'), this.translateService.instant('Error'))
    }
    else {
      this.authService.register(this.registerForm.value).subscribe(res => {
        this.tostrService.success(this.translateService.instant('AccountCreatedSuccessfuly'), this.translateService.instant('Success'));
        this.router.navigate(['/login']);
      })
    }

  }
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true })
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }
}
