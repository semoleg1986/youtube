import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  @Input() size = 'normal';

  @Input() disabled = false;

  get buttonSize(): string {
    switch (this.size) {
      case 'small':
        return 'small-button';
      case 'tiny':
        return 'tiny-button';
      case 'control':
        return 'control-button';
      case 'favs':
        return 'favs-button';
      case 'prev':
        return 'prev-button';
      case 'login':
        return 'login-button';
      default:
        return 'normal-button';
    }
  }  
}
