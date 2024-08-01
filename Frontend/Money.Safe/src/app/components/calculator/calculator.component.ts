import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  display: string = '';
  currentNumber: string = '';
  operator: string = '';
  previousNumber: string = '';

  onButtonClick(value: string): void {
    if (!isNaN(+value)) {
      this.currentNumber += value;
      this.display = this.currentNumber;
    } else if (value === 'C') {
      this.clear();
    } else if (value === '=') {
      this.calculate();
    } else {
      this.operator = value;
      this.previousNumber = this.currentNumber;
      this.currentNumber = '';
    }
  }

  clear(): void {
    this.display = '';
    this.currentNumber = '';
    this.previousNumber = '';
    this.operator = '';
  }

  calculate(): void {
    const prev = parseFloat(this.previousNumber);
    const current = parseFloat(this.currentNumber);

    if (this.operator === '+') {
      this.display = (prev + current).toString();
    } else if (this.operator === '-') {
      this.display = (prev - current).toString();
    } else if (this.operator === '*') {
      this.display = (prev * current).toString();
    } else if (this.operator === '/') {
      this.display = (prev / current).toString();
    }

    this.currentNumber = this.display;
    this.operator = '';
  }
}
