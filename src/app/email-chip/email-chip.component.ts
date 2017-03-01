import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Email } from '../shared/email.model';
@Component({
  selector: 'ec-email-chip',
  templateUrl: './email-chip.component.html',
  styleUrls: ['./email-chip.component.scss']
})
export class EmailChipComponent {
  @Input() email: Email;
  @Output() remove = new EventEmitter<Email>();
  @Input() disabled: boolean;

  getColor() {
    if (this.email && this.email.isValid) {
      return 'primary';
    } else {
      return 'warn';
    }
  }

  removeIconClick() {
    if (!this.disabled) {
      this.remove.emit(this.email);
    }
  }
}
