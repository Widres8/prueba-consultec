import { VehicleDealersService } from '@core/services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCustomerComponent } from './form-customer.component';

describe('FormCustomerComponent', () => {
  let component: FormCustomerComponent;
  let activeModal: NgbActiveModal;
  let service: VehicleDealersService;

  beforeEach(async () => {
    activeModal = jasmine.createSpyObj('NgbActiveModal', ['close']);
    component = new FormCustomerComponent(activeModal, service);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('modal close', () => {
    component.onClose();
    expect(activeModal.close).toHaveBeenCalled();
  });

  it(`ngOnInit must init component and loat elements`, () => {
    component.ngOnInit();
    expect(component.form).toBeTruthy();
  });

  it(`onSubmit must emitter`, () => {
    component.initialState = {
      name: 'name',
    };
    component.ngOnInit();
    component.onSubmit();
    expect(component.form).toBeTruthy();
  });
});
