import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { EmailsValidationMessageTypes } from '../shared/emails-validation-message-types';
import { EmailFormComponent } from './email-form.component';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { EmailsInputComponent } from '../emails-input/emails-input.component';
import { EmailChipComponent } from '../email-chip/email-chip.component';
import { EmailService } from './email.service';
import { DialogService } from '../shared/dialog.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
class EmailServiceStub {
  send() { return Observable.of(); }
}
class DialogServiceStub {
  openNotificationMessageListDialog() { return Observable.of(); }
}

describe('EmailFormComponent', () => {
  let component: EmailFormComponent;
  let fixture: ComponentFixture<EmailFormComponent>;
  let emailService: EmailServiceStub;
  let dialogService: DialogServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      declarations: [
        EmailFormComponent,
        EmailChipComponent,
        EmailsInputComponent
      ],
      providers: [
        { provide: EmailService, useClass: EmailServiceStub },
        { provide: DialogService, useClass: DialogServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([EmailService, DialogService], (es, ds) => {
    emailService = es;
    dialogService = ds;
  }));

  describe('getHintLabelForEmailError', () => {
    it('should get hint label as isEmailsInvalid message when email invalid error', () => {
      const expectedMessage = EmailsValidationMessageTypes.isEmailsInvalid.message;
      const errorObject = {};
      errorObject[EmailsValidationMessageTypes.isEmailsInvalid.propertyName] = true;
      const control = new FormControl();
      control.setErrors(errorObject);
      expect(component.getHintLabelForEmailError(control)).toBe(expectedMessage);
    });

    it('should get hint label as isRequiredEmailNotProvided message when email required but not provided error and form is dirty', () => {
      const expectedMessage = EmailsValidationMessageTypes.isRequiredEmailNotProvided.message;
      const errorObject = {};
      errorObject[EmailsValidationMessageTypes.isRequiredEmailNotProvided.propertyName] = true;
      const control = new FormControl();
      control.setErrors(errorObject);
      control.markAsDirty();
      expect(component.getHintLabelForEmailError(control)).toBe(expectedMessage);
    });

    it('should get empty hint label when email required but not provided error and form is not dirty', () => {
      const errorObject = {};
      errorObject[EmailsValidationMessageTypes.isRequiredEmailNotProvided.propertyName] = true;
      const control = new FormControl();
      control.setErrors(errorObject);
      expect(component.getHintLabelForEmailError(control)).toBe('');
    });

    it('should get empty hint label when no error', () => {
      const control = new FormControl();
      expect(component.getHintLabelForEmailError(control)).toBe('');
    });
  });

  describe('isRequiredControlErrorThrown', () => {
    it('should return false when undefined control', () => {
      expect(component.isRequiredControlErrorThrown(undefined)).toBe(false);
    });
    it('should return false when control with no errors', () => {
      const control = new FormControl();
      control.markAsDirty();
      expect(component.isRequiredControlErrorThrown(control)).toBe(false);
    });
    it('should return false when control has required error but is not touched', () => {
      const control = new FormControl();
      control.setErrors({ required: true });
      expect(component.isRequiredControlErrorThrown(control)).toBe(false);
    });
    it('should return true when control has required error and is touched', () => {
      const control = new FormControl();
      control.setErrors({ required: true });
      control.markAsTouched();
      expect(component.isRequiredControlErrorThrown(control)).toBe(true);
    });
  });

  describe('onSubmit', () => {
    it('should send all form parameters in send email request', () => {
      const emailSendSpy = spyOn(emailService, 'send').and.returnValue(Observable.of());
      const expectedEmail = { address: 'test@gmail.com', isValid: true };
      const expectedMessage = 'test';
      component.emailForm.get('to').setValue([expectedEmail]);
      component.emailForm.get('cc').setValue([expectedEmail]);
      component.emailForm.get('bcc').setValue([expectedEmail]);
      component.emailForm.get('subject').setValue(expectedMessage);
      component.emailForm.get('text').setValue(expectedMessage);
      component.onSubmit();
      expect(emailService.send).toHaveBeenCalledWith(
        {
          to: [expectedEmail.address],
          cc: [expectedEmail.address],
          bcc: [expectedEmail.address],
          subject: expectedMessage,
          text: expectedMessage
        }
      );
    });

    it('should show validation dialog with invalid email when email is invalid', () => {
      const dialogSpy = spyOn(dialogService, 'openNotificationMessageListDialog');
      const invalidEmail = { address: 'test@', isValid: false };
      const expectedMessage = 'test';
      component.emailForm.get('to').setValue([invalidEmail]);
      component.emailForm.get('subject').setValue(expectedMessage);
      component.emailForm.get('text').setValue(expectedMessage);
      component.onSubmit();
      expect(dialogService.openNotificationMessageListDialog).toHaveBeenCalledWith(
        'Please fix validation errors', [`to field value "${invalidEmail.address}" is not a valid email`]
      );
    });

    it('should show validation dialog when required email not provided', () => {
      const dialogSpy = spyOn(dialogService, 'openNotificationMessageListDialog');
      const expectedEmail = { address: 'test@gmail.com', isValid: true };
      const expectedMessage = 'test';
      component.emailForm.get('subject').setValue(expectedMessage);
      component.emailForm.get('text').setValue(expectedMessage);
      component.onSubmit();
      expect(dialogService.openNotificationMessageListDialog).toHaveBeenCalledWith(
        'Please fix validation errors', ['to field value is required']
      );
    });
    it('should show validation dialog when required subject not provided', () => {
      const dialogSpy = spyOn(dialogService, 'openNotificationMessageListDialog');
      const expectedEmail = { address: 'test@gmail.com', isValid: true };
      const expectedMessage = 'test';
      component.emailForm.get('to').setValue([expectedEmail]);
      component.emailForm.get('text').setValue(expectedMessage);
      component.onSubmit();
      expect(dialogService.openNotificationMessageListDialog).toHaveBeenCalledWith(
        'Please fix validation errors', ['subject field value is required']
      );
    });
  });
});
