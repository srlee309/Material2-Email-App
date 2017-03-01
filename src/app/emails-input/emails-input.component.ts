import { Attribute, Component, forwardRef, Input, ElementRef, Renderer, ViewChild } from '@angular/core';
import { Email } from '../shared/email.model';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { EmailsValidationMessageTypes } from '../shared/emails-validation-message-types';
const noop = () => { };

@Component({
  selector: 'ec-emails-input',
  templateUrl: './emails-input.component.html',
  styleUrls: ['./emails-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailsInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailsInputComponent),
      multi: true
    }
  ]
})
export class EmailsInputComponent implements ControlValueAccessor, Validator {
  @Input() placeholder: string;
  @Input() hintLabel: string;
  @ViewChild('userInput') input: ElementRef;

  public disabled = false;
  public currentUserInput: string;
  public enteredEmails: Email[] = [];
  public isInputFocused: boolean;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private validateFn: any = () => { };

  constructor (private renderer: Renderer) { }

  addUserProvidedEmail() {
    if (this.currentUserInput) {
      this.enteredEmails.push(new Email(this.currentUserInput));
      this.currentUserInput = '';
      this.onChangeCallback(this.enteredEmails);
    }
    this.setIsInputFocused(false);
  }

  isEmpty() {
    return this.enteredEmails.length === 0 && !this.currentUserInput;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  removeEmailAtIndex(index: number) {
    this.enteredEmails.splice(index, 1);
    this.onChangeCallback(this.enteredEmails);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.renderer.setElementAttribute(this.input.nativeElement, 'disabled', 'true');
    } else {
      this.renderer.setElementAttribute(this.input.nativeElement, 'disabled', null);
    }
  }

  setIsInputFocused(isFocused: boolean) {
    this.isInputFocused = isFocused;
  }
  validate(control: FormControl) {
    return this.validateFn(control);
  }

  writeValue(emailValues: Email[]) {
    if (emailValues && emailValues.length > 0) {
        this.enteredEmails = emailValues;
    }
    this.onChangeCallback(this.enteredEmails);
  }
}
