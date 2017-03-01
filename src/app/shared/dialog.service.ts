import { Observable } from 'rxjs/Rx';
import { NotificationMessageDialogComponent } from '../notification-message-dialog/notification-message-dialog.component';
import { NotificationMessageListDialogComponent } from '../notification-message-list-dialog/notification-message-list-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class DialogService {

    constructor(private dialog: MdDialog) { }

    public openNotificationMessageDialog(title: string, message: string): Observable<void> {
        let dialogRef: MdDialogRef<NotificationMessageDialogComponent>;
        dialogRef = this.dialog.open(NotificationMessageDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        return dialogRef.afterClosed();
    }

    public openNotificationMessageListDialog(title: string, messages: string[]): Observable<void> {
        let dialogRef: MdDialogRef<NotificationMessageListDialogComponent>;
        dialogRef = this.dialog.open(NotificationMessageListDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.messages = messages;
        return dialogRef.afterClosed();
    }
}
