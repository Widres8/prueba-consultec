import { CustomerService } from '@core/services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteCustomerComponent } from './delete-customer.component';

describe('DeleteCustomerComponent', () => {
  let component: DeleteCustomerComponent;
  let service: CustomerService;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    service = jasmine.createSpyObj<CustomerService>('CustomerService', [
      'update',
    ]);
    activeModal = jasmine.createSpyObj('NgbActiveModal', ['close']);
    component = new DeleteCustomerComponent(service, activeModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('modal close', () => {
    component.onClose();
    expect(activeModal.close).toHaveBeenCalled();
  });

  it('should submit', () => {
    component.item = Object.assign({
      id: 1,
      firstName: 'name',
    });
    component.onSubmit();
    expect(service.update).toHaveBeenCalled();
  });

  it('should submit error', () => {
    component.item = Object.assign({
      id: 1,
      firstName: 'name',
    });
    (service.update as jasmine.Spy).and.throwError(
      new Error('Failed to create')
    );
    component.onSubmit();
    expect(activeModal.close).toHaveBeenCalled();
  });
});
