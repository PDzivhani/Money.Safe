import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{

  constructor(private router: Router) {}

  currentSlide = 0;
  slides = [
    { imageUrl: 'assets/imgs/slide1.png', alt: 'slide1' },
    { imageUrl: 'assets/imgs/slide2.png', alt: 'slide2' },
    { imageUrl: 'assets/imgs/slide3.png', alt: 'slide3' }
      ];
  dots = new Array(this.slides.length);

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide >= this.slides.length - 1 ? this.currentSlide = 0 : this.currentSlide++;
  }

  prevSlide() {
    this.currentSlide <= 0 ? this.currentSlide = this.slides.length - 1 : this.currentSlide--;
  }

  slideToRegister() {
    const button = document.querySelector('.toggle-button') as HTMLElement;
    button.classList.add('slide');

    // Delay the navigation to allow the animation to complete
    setTimeout(() => {
      this.router.navigate(['/signup']);
    }, 500); // Match this delay with the CSS transition duration
  }

}
