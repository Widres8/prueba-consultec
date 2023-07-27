import { CustomerService } from './customer.service';

describe(`#${CustomerService.name}`, () => {
  let service: CustomerService;
  let httpClientSpy: { post: jasmine.Spy; get: jasmine.Spy };
  let storage: Storage;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    storage = jasmine.createSpyObj('Storage', [
      'getItem',
      'setItem',
      'removeItem',
    ]);
    service = new CustomerService(httpClientSpy as any, storage);
  });

  it(`#${CustomerService.name} should be created`, () => {
    expect(service).toBeTruthy();
  });
});
