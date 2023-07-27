import { VehicleDealers } from '@shared/models';
import { of } from 'rxjs';
import { VehicleDealersService } from './vehicle-dealers.service';

describe(`#${VehicleDealersService.name}`, () => {
  let service: VehicleDealersService;
  let httpClientSpy: { post: jasmine.Spy; get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    service = new VehicleDealersService(httpClientSpy as any);
  });

  it(`#${VehicleDealersService.name} should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${VehicleDealersService.prototype.getAll.name} get all`, async () => {
    const endpoint = service.url;
    const model: VehicleDealers[] = [];
    httpClientSpy.get.withArgs(`${endpoint}`).and.returnValue(of(model));
    const result = await service.getAll();
    expect(result).toEqual(model);
  });
});
