import { EmailsValidationMessage} from './emails-validation-message.interface';

export class EmailsValidationMessageTypes {
    static readonly isEmailsInvalid: EmailsValidationMessage = {
        propertyName: 'isEmailsInvalid',
        message: 'Invalid email'
    };
    static readonly isRequiredEmailNotProvided: EmailsValidationMessage = {
        propertyName: 'isRequiredEmailNotProvided',
        message: 'Required'
    };
}
