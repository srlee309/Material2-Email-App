import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as EmailsInputValidators from './emails-input.validators';
import { EmailsValidationMessageTypes } from '../shared/emails-validation-message-types';
import { EmailsValidationMessage } from '../shared/emails-validation-message.interface';
import { Email } from '../shared/email.model';
import { EmailService } from './email.service';
import { EmailRequest } from './email-request.interface';
import { DialogService } from '../shared/dialog.service';
@Component({
  selector: 'ec-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {
  public emailForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private emailService: EmailService, private dialogService: DialogService) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      to: [[], Validators.compose([EmailsInputValidators.isEmailRequired, EmailsInputValidators.isEmailsValid])],
      cc: [[], EmailsInputValidators.isEmailsValid],
      bcc: [[], EmailsInputValidators.isEmailsValid],
      subject: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  getHintLabelForEmailError(control: AbstractControl): string {
    if (control && control.errors) {
      if (control.errors[EmailsValidationMessageTypes.isEmailsInvalid.propertyName]) {
        return EmailsValidationMessageTypes.isEmailsInvalid.message;
      } else if (control.errors[EmailsValidationMessageTypes.isRequiredEmailNotProvided.propertyName] && control.dirty) {
        return EmailsValidationMessageTypes.isRequiredEmailNotProvided.message;
      }
    }

    return '';
  }
  private getValidationErrorMessagesForEmailControl(controlName: string): string[] {
    const control = this.emailForm.get(controlName);
    if (control && control.errors) {
      if (control.errors[EmailsValidationMessageTypes.isEmailsInvalid.propertyName]) {
        return control.value
          .filter((item: Email) => !item.isValid)
          .map((item: Email) => `${controlName} field value "${item.address}" is not a valid email`);
      } else if (control.errors[EmailsValidationMessageTypes.isRequiredEmailNotProvided.propertyName]) {
        return [`${controlName} field value is required`];
      }
    } else {
      return [];
    }
  }
  private getValidationErrorMessages(): string[] {
    const validationMessages = [].concat(
      this.getValidationErrorMessagesForEmailControl('to'),
      this.getValidationErrorMessagesForEmailControl('cc'),
      this.getValidationErrorMessagesForEmailControl('bcc')
    );
    const subjectControl = this.emailForm.get('subject');
    if (subjectControl.hasError('required')) {
      validationMessages.push('subject field value is required');
    }
    const textControl = this.emailForm.get('text');
    if (textControl.hasError('required')) {
      validationMessages.push('text field value is required');
    }
    return validationMessages;
  }

  isRequiredControlErrorThrown(control: AbstractControl): boolean {
    if (!control || !control.errors) {
      return false;
    }
    return control.touched && control.errors['required'];
  }

  onSubmit(): void {
    const formValue = this.emailForm.value;
    if (this.emailForm.valid) {
      this.emailForm.disable();
      const request: EmailRequest = {
        to: formValue.to.map((item) => item.address),
        cc: formValue.cc.map((item) => item.address),
        bcc: formValue.bcc.map((item) => item.address),
        subject: formValue.subject,
        text: formValue.text
      };
      this.emailService.send(request)
        .finally(() => this.emailForm.enable())
        .subscribe(
          data => this.dialogService.openNotificationMessageDialog('Success', 'Message was sent successfully'),
          err => this.dialogService.openNotificationMessageDialog('Error', 'Error occured. Please try again later.')
        );
    } else {
      this.dialogService.openNotificationMessageListDialog('Please fix validation errors', this.getValidationErrorMessages());
      this.emailForm.controls['to'].markAsDirty();
      this.emailForm.controls['cc'].markAsDirty();
      this.emailForm.controls['bcc'].markAsDirty();
      this.emailForm.controls['subject'].markAsDirty();
      this.emailForm.controls['text'].markAsDirty();
    }
  }
}
