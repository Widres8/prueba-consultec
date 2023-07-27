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
});
