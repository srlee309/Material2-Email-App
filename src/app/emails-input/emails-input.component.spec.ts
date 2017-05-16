import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { EmailsInputComponent } from './emails-input.component';
import { FormsModule } from '@angular/forms';
import { EmailChipComponent } from '../email-chip/email-chip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Email } from '../shared/email.model';
import 'hammerjs';
const testEmail: Email = { address: 'email@domain.com', isValid: true };
describe('EmailsInputComponent', () => {
  let component: EmailsInputComponent;
  let fixture: ComponentFixture<EmailsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, MaterialModule],
      declarations: [EmailChipComponent, EmailsInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should add current input as an email', () => {
    component.currentUserInput = 'test';
    fixture.detectChanges();
    component.addUserProvidedEmail();
    fixture.detectChanges();
    expect(component.enteredEmails.length).toBe(1);
  });

  it('should be considered empty when no email added and no input provided', () => {
    expect(component.isEmpty()).toBeTruthy();
  });

  it('should not be considered empty when email added', () => {
    component.enteredEmails = [testEmail];
    fixture.detectChanges();
    expect(component.isEmpty()).toBeFalsy();
  });

  it('should not be considered empty when input provided', () => {
    component.currentUserInput = 'test';
    fixture.detectChanges();
    expect(component.isEmpty()).toBeFalsy();
  });

  it('should remove email at given index', () => {
    const emailToBeRemoved: Email = { address: 'test', isValid: true };
    component.enteredEmails = [testEmail, testEmail, emailToBeRemoved, testEmail];
    fixture.detectChanges();
    component.removeEmailAtIndex(2);
    fixture.detectChanges();
    const isContainingRemovedElement =
      component.enteredEmails.some((email: Email) => email.address === 'test');
    expect(isContainingRemovedElement).toBeFalsy();
  });

  it('should write provided emails to component value', () => {
    component.writeValue([testEmail, testEmail]);
    fixture.detectChanges();
    expect(component.enteredEmails.length).toBe(2);
  });
});
