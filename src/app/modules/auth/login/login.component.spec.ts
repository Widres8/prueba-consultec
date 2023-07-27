import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/services';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'login',
      'isAuthenticate',
    ]);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(LoginComponent, {
        set: {
          providers: [
            { provide: AuthService, useValue: authService },
            { provide: Router, useValue: router },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.initForm();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#${LoginComponent.prototype.initForm} Must excecute initForm()`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${LoginComponent.prototype.resetUserValidation} Must excecute resetUserValidation()`, () => {
    component.resetUserValidation();
    expect(component.validCredentials).toEqual(true);
  });

  it(`#${LoginComponent.prototype.toggleShowPassword} Must excecute toggleShowPassword()`, () => {
    component.toggleShowPassword();
    expect(component.showPassword).toEqual(true);
  });

  it(`#${LoginComponent.prototype.onSubmit} Must excecute onSubmit()`, async () => {
    (authService.login as jasmine.Spy).and.returnValue({ result: 'true' });
    (authService.isAuthenticate as jasmine.Spy).and.returnValue(true);
    component.form.get('user')?.setValue(new FormControl('user1'));
    component.form.get('password')?.setValue(new FormControl('123'));
    component.onSubmit();
    expect(await authService.isAuthenticate()).toEqual(true);
    (authService.isAuthenticate as jasmine.Spy).and.returnValue(false);
    component.onSubmit();
    expect(await authService.isAuthenticate()).toEqual(false);
  });
});
