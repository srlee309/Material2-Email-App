import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { EmailChipComponent } from './email-chip.component';
const testEmail = { address: 'email@domain.com', isValid: true };
describe('EmailChipComponent', () => {
  let component: EmailChipComponent;
  let fixture: ComponentFixture<EmailChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [EmailChipComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have primary color when email value is valid', () => {
    component.email = testEmail;
    fixture.detectChanges();
    expect(component.getColor()).toBe('primary');
  });

  it('should have warn color when email value is not valid', () => {
    component.email = testEmail;
    testEmail.isValid = false;
    fixture.detectChanges();
    expect(component.getColor()).toBe('warn');
  });
});
