import { EmailComposerPage } from './app.po';

describe('email-composer App', () => {
  let page: EmailComposerPage;

  beforeEach(() => {
    page = new EmailComposerPage();
  });

  it('should display success dialog when email sent successfully', () => {
    page.navigateTo();
    page.setEmailControlText('to', 'scottlee309@gmail.com');
    page.setInputControlText('subject', 'test');
    page.setTextAreaControlText('text', 'test');
    page.clickSubmitButton();
    expect(page.getDialogTitle()).toEqual('Success');
  });

    it('should display validation error when invalid email', () => {
    page.navigateTo();
    page.setEmailControlText('to', 'scottlee');
    page.setInputControlText('subject', 'test');
    page.setTextAreaControlText('text', 'test');
    page.clickSubmitButton();
    expect(page.getDialogTitle()).toEqual('Please fix validation errors');
  });
});
