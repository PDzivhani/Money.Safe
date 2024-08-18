import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/Users';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  

  userForm: FormGroup; // Form group for user profile form
  user: Users | undefined; // User object from Users model
  editing: boolean = false; // Flag to track if user is in edit mode

  constructor(
    private fb: FormBuilder, // FormBuilder for creating reactive forms
    private userService: UserService, // Service for user profile operations
    private authService: AuthService, // Service for authentication operations
    private toastrService: ToastrService,
    // private userDataService: UserDataService, // Inject the shared service
    private router: Router
  ) {
    // Initialize the userForm FormGroup with form controls and validators
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    // Extract user ID from authentication token and fetch user data on component initialization
    const userId = this.authService.extractUserIdFromToken();
    if (userId) {
      this.getUser(userId); // Fetch user data if user ID is available
    } else {
      console.error('No user ID available.'); // Log an error if user ID is not available
    }
  }

  // Method to fetch user data by ID
  getUser(id: number): void {
    this.userService.getUser(id).subscribe(
      (data: Users) => {
        this.user = data; // Assign fetched user data to the component's user property
        // Patch form controls with fetched user data
        this.userForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          image: data.image
        });
      },
      (error) => {
        console.error('Error fetching user:', error); // Log an error if user data fetching fails
      }
    );
  }

  // Method to update user profile
updateProfile(): void {
   // Check if user exists and the form is valid
   if (this.user && this.userForm.valid) {
    const formData = new FormData(); // Create a new FormData object to hold the form data

    // Append user details as a JSON blob to formData
    formData.append('userDetails', new Blob([JSON.stringify({
      firstName: this.userForm.value.firstName, // Add firstName from form value
      lastName: this.userForm.value.lastName,   // Add lastName from form value
      email: this.userForm.value.email,         // Add email from form value
      // phoneNumber: this.userForm.value.mobile,  // Add phoneNumber from form value
      // address: this.userForm.value.address      // Add address from form value
    })], {
      type: 'application/json' // Set blob type as application/json
    }));

    // Check if an image is selected and append it to formData
    if (this.userForm.value.image) {
      formData.append('image', this.userForm.value.image); // Add image file to formData
    }

    // Call the userService to update the user with formData
    this.userService.updateUser(this.user.id, formData).subscribe(
      (data: Users) => { // On success
        console.log('Updated user data:', data); // Log the updated user data
        this.user = data; // Update the component's user property with the new data
        this.userService.updateUsers(data); // Update shared user data
        // Swal.fire('Success', 'Profile updated successfully', 'success'); // Show success alert
        this.router.navigate(['/profile']); // Navigate to the profile page
      },
      (error: HttpErrorResponse) => { // On error
        console.error('Error updating user:', error); // Log the error
        // Swal.fire('Error', 'An error occurred while updating the profile', 'error'); // Show error alert
      }
    );
  } else {
    console.error('Form is not valid or user data is not available.'); // Log an error if form is invalid or user data is unavailable
  }
}
  
  onSubmit() {
    if (this.userForm.valid) {
      console.log("Form Save!!!",this.userForm.value);
    } else {
      this.toastrService.error('Please fill in all fields correctly!', 'Close');
    }
  }
  
}
