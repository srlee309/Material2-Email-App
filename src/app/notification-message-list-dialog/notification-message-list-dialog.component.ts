import { Component, Input } from '@angular/core';

@Component({
  selector: 'ec-notification-message-list-dialog',
  templateUrl: './notification-message-list-dialog.component.html',
  styleUrls: ['./notification-message-list-dialog.component.scss']
})
export class NotificationMessageListDialogComponent {
  public title: string;
  public messages: string[];
}
