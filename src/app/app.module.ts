import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { AppComponent } from './app.component';
import { EmailsInputComponent } from './emails-input/emails-input.component';
import { EmailChipComponent } from './email-chip/email-chip.component';
import { EmailFormComponent } from './email-form/email-form.component';
import {EmailService} from './email-form/email.service';
import { NotificationMessageDialogComponent } from './notification-message-dialog/notification-message-dialog.component';
import { NotificationMessageListDialogComponent } from './notification-message-list-dialog/notification-message-list-dialog.component';
import { DialogService } from './shared/dialog.service';
@NgModule({
  declarations: [
    AppComponent,
    EmailsInputComponent,
    EmailChipComponent,
    EmailFormComponent,
    NotificationMessageDialogComponent,
    NotificationMessageListDialogComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [EmailService, DialogService],
  bootstrap: [AppComponent],
  entryComponents: [
    NotificationMessageDialogComponent,
    NotificationMessageListDialogComponent
  ]
})
export class AppModule { }
