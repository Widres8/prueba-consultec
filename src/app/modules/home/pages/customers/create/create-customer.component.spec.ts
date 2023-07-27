import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomerService } from '@core/services';
import { StatusEnum } from '@shared/enums';
import { Customer } from '@shared/models';
import { CreateCustomerComponent } from './create-customer.component';

describe('CreateCustomerComponent', () => {
  let component: CreateCustomerComponent;
  let service: CustomerService;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    service = jasmine.createSpyObj<CustomerService>('CustomerService', [
      'create',
    ]);
    activeModal = jasmine.createSpyObj('NgbActiveModal', ['close']);

    component = new CreateCustomerComponent(service, activeModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`onSubmit must save customer`, () => {
    const model: Customer = {
      id: 1,
      firstName: '',
      lastName: '',
      document: '',
      phone: '',
      vehicleDealer: {
        id: 1,
        name: '',
        city: {
          id: 1,
          name: '',
        },
      },
      documentType: {
        id: 0,
        name: '',
      },
      status: StatusEnum.Enabled,
    };
    component.onSubmit(model);
    expect(service.create).toHaveBeenCalled();
  });

  it(`onSubmit must update customer and error`, () => {
    const model: Customer = {
      id: 1,
      firstName: '',
      lastName: '',
      document: '',
      phone: '',
      vehicleDealer: {
        id: 1,
        name: '',
        city: {
          id: 1,
          name: '',
        },
      },
      documentType: {
        id: 0,
        name: '',
      },
      status: StatusEnum.Enabled,
    };

    (service.create as jasmine.Spy).and.throwError(
      new Error('Failed to create')
    );

    component.onSubmit(model);
    expect(activeModal.close).toHaveBeenCalled();
  });
});
