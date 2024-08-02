import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  isSlideOut = true;
  constructor(private router: Router){}

  toggleSlideOut(): void {
    this.isSlideOut = !this.isSlideOut;
  }
 
  onProfile(){
    this.router.navigate(['/profile']);
  }
  onHistory(){
    this.router.navigate(['/transactions']);
  }
  onLogout(){
    this.router.navigate(['']);
  }
}
