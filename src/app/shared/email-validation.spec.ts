import { Email } from './email.model';
describe('EmailValidation', () => {
    it('should return true when valid address', () => {
        const email = new Email('email@domain.com');
        expect(email.isValid).toBeTruthy();
    });

    it('should return true when valid address with dots', () => {
        const email = new Email('firstname.lastname@domain.com');
        expect(email.isValid).toBeTruthy();
    });

    it('should return true when valid address with dots and subdomain', () => {
        const email = new Email('email@subdomain.domain.com');
        expect(email.isValid).toBeTruthy();
    });

    it('should return true when valid address with plus sign', () => {
        const email = new Email('firstname+lastname@domain.com');
        expect(email.isValid).toBeTruthy();
    });

    it('should return true when valid address with digits in address', () => {
        const email = new Email('1234567890@domain.com');
        expect(email.isValid).toBeTruthy();
    });

    it('should return true when valid address with dash in domain', () => {
        const email = new Email('email@domain-one.com');
        expect(email.isValid).toBeTruthy();
    });

    it('should return true when valid address with dash in address', () => {
        const email = new Email('firstname-lastname@domain.com');
        expect(email.isValid).toBeTruthy();
    });

    it('should return false when missing domain', () => {
        const email = new Email('email');
        expect(email.isValid).toBeFalsy();
    });

    it('should return false when missing address', () => {
        const email = new Email('@domain.com');
        expect(email.isValid).toBeFalsy();
    });

    it('should return false when trailing dot in address', () => {
        const email = new Email('email.@domain.com');
        expect(email.isValid).toBeFalsy();
    });
});
