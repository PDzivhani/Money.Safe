// toast.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input() message: string = '';
  show: boolean = false;

  showToast(message: string) {
    this.message = message;
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 3000);
  }
}
