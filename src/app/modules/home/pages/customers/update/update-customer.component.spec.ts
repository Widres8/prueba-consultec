import { CustomerService } from '@core/services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCustomerComponent } from './update-customer.component';

describe('UpdateCustomerComponent', () => {
  let component: UpdateCustomerComponent;
  let service: CustomerService;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    service = jasmine.createSpyObj<CustomerService>('CustomerService', [
      'update',
    ]);
    activeModal = jasmine.createSpyObj('NgbActiveModal', ['close']);

    component = new UpdateCustomerComponent(service, activeModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('modal close', () => {
    component.onClose();
    expect(activeModal.close).toHaveBeenCalled();
  });

  it('should submit', () => {
    const model = Object.assign({
      id: 1,
      firstName: 'name',
    });
    component.item = model;
    component.onSubmit(model);
    expect(service.update).toHaveBeenCalled();
  });

  it('should submit error', () => {
    const model = Object.assign({
      id: 1,
      firstName: 'name',
    });
    component.item = model;
    (service.update as jasmine.Spy).and.throwError(
      new Error('Failed to create')
    );
    component.onSubmit(model);
    expect(activeModal.close).toHaveBeenCalled();
  });
});
