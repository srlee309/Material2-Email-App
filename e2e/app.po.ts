import { browser, element, by } from 'protractor';

export class EmailComposerPage {
  navigateTo() {
    return browser.get('/');
  }

  setEmailControlText(controlName: string, text: string) {
    const control = element(by.css(`ec-emails-input[formControlName='${controlName}'] input`));
    return control.sendKeys(text);
  }

  setInputControlText(controlName: string, text: string) {
    const control = element(by.css(`input[formControlName='${controlName}']`));
    return control.sendKeys(text);
  }

  setTextAreaControlText(controlName: string, text: string) {
    const control = element(by.css(`textarea[formControlName='${controlName}']`));
    return control.sendKeys(text);
  }

  clickSubmitButton() {
    element(by.className('ec-submit-button')).click();
  }
  getDialogTitle() {
    return element(by.className('mat-dialog-title')).getText();
  }
}
