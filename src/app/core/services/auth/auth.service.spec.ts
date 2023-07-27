import { AuthService } from './auth.service';

describe(`#${AuthService.name}`, () => {
  let service: AuthService;
  let httpClientSpy: { post: jasmine.Spy; get: jasmine.Spy };
  let storage: Storage;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    storage = jasmine.createSpyObj('Storage', [
      'getItem',
      'setItem',
      'removeItem',
    ]);
    service = new AuthService(httpClientSpy as any, storage);
  });

  it(`#${AuthService.name} should be created`, () => {
    expect(service).toBeTruthy();
  });
});
