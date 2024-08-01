import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm:any;

  constructor(private fb: FormBuilder, private toastrService: ToastrService) {}
  
  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      occupation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.profileForm.valid) {
      console.log("Form Save!!!",this.profileForm.value);
    } else {
      this.toastrService.error('Please fill in all fields correctly!', 'Close');
    }
  }
  
}
