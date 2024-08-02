import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

// Declare gapi as a global variable
declare var gapi: any;

@Component({
  selector: 'app-user-auth-form',
  templateUrl: './user-auth-form.component.html',
  styleUrls: ['./user-auth-form.component.scss']
})
export class UserAuthFormComponent implements OnInit {
  authForm: FormGroup;
  type: 'sign-in' | 'sign-up' = 'sign-up';
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.authForm = this.fb.group({
      firstname: ['', [Validators.minLength(3)]],
      lastname: ['', [Validators.minLength(3)]],
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
      this.authForm.get('email')?.clearValidators();
    } else {
      this.authForm.get('email')?.setValidators([Validators.minLength(3)]);
    }
    this.authForm.get('email')?.updateValueAndValidity();
  }

  handleSubmit(): void {
    if (this.authForm.invalid) {
      this.toastr.error('Please fill out the form correctly.');
      return;
    }

    const formData = this.authForm.value;

    if (this.type === 'sign-in') {
      this.authService.signIn(formData).subscribe(
        (data: any) => this.toastr.success('Sign in successful!'),
       
        (_error: any) => this.toastr.error('Sign in unsuccessful. Please try again.')
      );
      this.router.navigate(['/home']);
    } else {
      this.authService.signUp(formData).subscribe(
        (_data: any) => this.toastr.success('Registration successful!'),
        (_error: any) => this.toastr.error('Registration failed. Please try again.')
      );
    }
  }

  handleGoogleAuth(event: Event): void {
    event.preventDefault();
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signIn().then((googleUser: any) => {
    const idToken = googleUser.getAuthResponse().id_token;

    this.authService.googleAuth(idToken).subscribe(
      (data: any) => {
        this.authService.handleAuthSuccess(data);
        this.toastr.success('Successfully signed in!');
        this.router.navigate(['/home']); // Redirect to home or desired page
      },
      (_error: any) => {
        this.toastr.error('Google sign in failed. Please try again.');
        console.error('Error during Google sign-in:', _error);
      }
    );
  }).catch((error: any) => {
    if (error.error === 'popup_closed_by_user') {
      this.toastr.warning('Sign-in popup was closed. Please try again.');
    } else {
      this.toastr.error('Google sign in failed. Please try again.');
      console.error('Error during Google sign-in:', error);
    }
  });
}

}
