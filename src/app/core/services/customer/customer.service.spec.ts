import { HttpClient } from '@angular/common/http';
import { StatusEnum } from '@shared/enums';
import { Customer } from '@shared/models';
import { of } from 'rxjs';
import { CustomerService } from './customer.service';

describe(`#${CustomerService.name}`, () => {
  let service: CustomerService;
  let httpClientSpy: { post: jasmine.Spy; get: jasmine.Spy };
  let storage: {
    getItem: jasmine.Spy;
    setItem: jasmine.Spy;
    removeItem: jasmine.Spy;
  };

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
    service = new CustomerService(httpClientSpy as any, storage as any);
  });

  it(`#${CustomerService.name} should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${CustomerService.prototype.getAll.name} get all`, async () => {
    const endpoint = service.url;
    const model: Customer[] = [];
    storage.getItem.and.returnValue(JSON.stringify(model));
    httpClientSpy.get.withArgs(`${endpoint}`).and.returnValue(of(model));
    const result = await service.getAll();
    expect(result).toEqual(model);
  });

  it(`#${CustomerService.prototype.getAll.name} get all storage null`, async () => {
    const endpoint = service.url;
    const model: Customer[] = [];
    httpClientSpy.get.withArgs(`${endpoint}`).and.returnValue(of(model));
    const result = await service.getAll();
    expect(result).toEqual(model);
  });

  it(`#${CustomerService.prototype.create.name} get create`, () => {
    const model: Customer = {
      id: 0,
      firstName: '',
      lastName: '',
      documentType: {
        id: 0,
        name: '',
      },
      document: '',
      phone: '',
      vehicleDealer: {
        id: 0,
        name: '',
        city: {
          id: 0,
          name: '',
        },
      },
      status: StatusEnum.Disabled,
    };
    storage.getItem.and.returnValue(JSON.stringify([model]));

    service.create(model);
    expect(storage.getItem).toHaveBeenCalled();
  });

  it(`#${CustomerService.prototype.update.name} get update`, () => {
    const model: Customer = {
      id: 0,
      firstName: '',
      lastName: '',
      documentType: {
        id: 0,
        name: '',
      },
      document: '',
      phone: '',
      vehicleDealer: {
        id: 0,
        name: '',
        city: {
          id: 0,
          name: '',
        },
      },
      status: StatusEnum.Disabled,
    };
    storage.getItem.and.returnValue(JSON.stringify([model]));

    service.update(model);
    expect(storage.getItem).toHaveBeenCalled();
  });
});
