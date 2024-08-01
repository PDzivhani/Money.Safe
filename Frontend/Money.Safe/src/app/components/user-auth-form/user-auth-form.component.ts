import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

// Declare gapi as a global variable
declare var gapi: any;

@Component({
  selector: 'app-user-auth-form',
  templateUrl: './user-auth-form.component.html',
  styleUrls: ['./user-auth-form.component.scss']
})
export class UserAuthFormComponent implements OnInit{
  authForm: FormGroup;
  type: 'sign-in' | 'sign-up' = 'sign-up';
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.authForm = this.fb.group({
      fullname: ['', [Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)]]
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.type = data['type'];
      this.adjustValidators();
    });

    // Initialize Google Sign-In
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '502221825285-r8f24t5pn1o161otuitfcepahhci01hr.apps.googleusercontent.com'
      });
    });
  }

  adjustValidators(): void {
    if (this.type === 'sign-in') {
      this.authForm.get('fullname')?.clearValidators();
    } else {
      this.authForm.get('fullname')?.setValidators([Validators.minLength(3)]);
    }
    this.authForm.get('fullname')?.updateValueAndValidity();
  }

  handleSubmit(): void {
    if (this.authForm.invalid) {
      this.toastr.error('Please fill out the form correctly.');
      return;
    }

    const formData = this.authForm.value;

    if (this.type === 'sign-in') {
      this.authService.signIn(formData).subscribe(
        (        data: any) => this.toastr.success('Sign in successful!'),
        (        _error: any) => this.toastr.error('Sign in unsuccesful. Please try again.')
      );
    } else {
      this.authService.signUp(formData).subscribe(
        (        _data: any) => this.toastr.success('Registration successful!'),
        (        _error: any) => this.toastr.error('Registration failed. Please try again.')
      );
    }
  }

  handleGoogleAuth(event: Event): void {
    event.preventDefault();
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser: any) => {
      const idToken = googleUser.getAuthResponse().id_token;

      this.authService.googleAuth(idToken).subscribe(
        (        data: any) => this.authService.handleAuthSuccess(data),
        (        error: any) => this.authService.handleAuthError(error, 'Google sign-in failed')
      );
    }).catch((error: any) => {
      this.authService.handleAuthError(error, 'Google sign-in failed');
      console.error(error);
    });
  }
}
