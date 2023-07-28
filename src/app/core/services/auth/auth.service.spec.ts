import { HttpClient } from '@angular/common/http';
import { User } from '@shared/models';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

describe(`#${AuthService.name}`, () => {
  let service: AuthService;
  let httpClientSpy: { post: jasmine.Spy; get: jasmine.Spy };
  let storage: Storage;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', [
      'post',
      'get',
    ]);
    storage = jasmine.createSpyObj<Storage>('Storage', [
      'getItem',
      'setItem',
      'removeItem',
    ]);
    service = new AuthService(httpClientSpy as any, storage);
  });

  it(`#${AuthService.name} should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${AuthService.prototype.login.name} login`, async () => {
    const endpoint = service.url;
    const model: User = {
      email: '',
      password: '',
      username: '',
    };
    httpClientSpy.get.withArgs(`${endpoint}`).and.returnValue(of(model));
    const result = await service.login();
    expect(result).toEqual(model);
  });

  it(`#${AuthService.prototype.logout.name} logout`, () => {
    const key = service.userKey;
    service.logout();
    const result = storage.getItem(key) === undefined;
    expect(result).toEqual(true);
  });

  it(`#${AuthService.prototype.isAuthenticate.name} isAuthenticate`, async () => {
    const model: User = {
      email: '',
      password: '',
      username: '',
    };
    const key = service.userKey;
    storage.setItem(key, JSON.stringify(model));
    const result = await service.isAuthenticate();
    expect(result).toEqual(false);
  });
});
