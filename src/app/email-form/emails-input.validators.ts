import { FormControl } from '@angular/forms';
import { Email } from '../shared/email.model';
import { EmailsValidationMessageTypes } from '../shared/emails-validation-message-types';

export function isEmailsValid(control: FormControl) {
  const emails: Email[] = control.value;
  const errorObject = {};
  errorObject[EmailsValidationMessageTypes.isEmailsInvalid.propertyName] = true;
  const isAllEmailsValid = emails.every((email) => email.isValid);
  return isAllEmailsValid || emails.length === 0 ? null : errorObject;
}

export function isEmailRequired(control: FormControl) {
  const emails: Email[] = control.value;
  const errorObject = {};
  errorObject[EmailsValidationMessageTypes.isRequiredEmailNotProvided.propertyName] = true;
  return emails.length > 0 ? null : errorObject;
}
