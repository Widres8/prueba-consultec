import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { User } from '@shared/models';
import { lastValueFrom, of } from 'rxjs';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: AuthService;
  const router = jasmine.createSpyObj<Router>(['navigate']);
  router.navigate.and.returnValue(lastValueFrom(of(true)));

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'login',
      'isAuthenticate',
    ]);
    component = new LoginComponent(authService, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#LoginComponent ngOnInit()`, () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it(`#LoginComponent resetUserValidation()`, () => {
    component.resetUserValidation();
    expect(component.validCredentials).toEqual(true);
  });

  it(`#LoginComponent toggleShowPassword()`, () => {
    component.toggleShowPassword();
    expect(component.showPassword).toEqual(true);
  });

  it(`#LoginComponent onSubmit()`, async () => {
    const { username, password } = { username: 'admin', password: '123456' };
    const model: User = {
      email: '',
      password,
      username,
    };
    (authService.login as jasmine.Spy).and.resolveTo(model);
    component.initForm();
    component.form.patchValue({
      username: username,
      password: password,
    });
    component.onSubmit();
    expect(component.validCredentials).toEqual(true);
  });
});
