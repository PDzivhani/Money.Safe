import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  currentSlide = 0;
  slides = [
    { imageUrl: 'assets/imgs/slide1.png', alt: 'slide1', title: 'Welcome to Money? Safe!', description: 'Track your expenses and manage your budget efficiently.' },
    { imageUrl: 'assets/imgs/slide2.png', alt: 'slide2', title: 'Monitor Your Spending', description: 'Get detailed insights into your spending habits.' },
    { imageUrl: 'assets/imgs/slide3.png', alt: 'slide3', title: 'Stay In Control', description: 'Set goals and stay on top of your finances.' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  slideToRegister() {
    const button = document.querySelector('.toggle-button') as HTMLElement;
    button.classList.add('slide');

    setTimeout(() => {
      this.router.navigate(['/signup']);
    }, 500); // Match this delay with the CSS transition duration
  }
}
