import * as EmailValidator from 'email-validator';
export class Email {
    public readonly isValid: boolean;

    constructor(public readonly address: string) {
        this.isValid = EmailValidator.validate(address);
    }
}
