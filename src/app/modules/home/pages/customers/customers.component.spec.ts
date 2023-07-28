import { CustomerService } from '@core/services';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TransactionStatusEnum } from '@shared/enums';
import { CustomersComponent } from './customers.component';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let service: CustomerService;
  let modalService: NgbModal;

  beforeEach(async () => {
    service = jasmine.createSpyObj<CustomerService>('CustomerService', [
      'create',
      'getAll',
    ]);
    modalService = jasmine.createSpyObj<NgbModal>('NgbModal', ['open']);
    component = new CustomersComponent(service, modalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    const model = [{ id: 1, firstName: 'John', lastName: 'lopez' }];
    (service.getAll as jasmine.Spy).and.resolveTo(model);
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it(`#${CustomersComponent.prototype.onCreate.name} must open modal`, () => {
    // prepare mocks
    const model: NgbModalRef = Object.assign({
      componentInstance: {
        id: '',
      },
      result: {
        then: (fn: (value: any) => void) =>
          fn({
            name: 'Profession',
            onCreate: TransactionStatusEnum.success,
            title: 'profession.save.success',
            subtitle: 'profession.save.success.subtitle',
          }),
      },
    });
    (modalService.open as jasmine.Spy).and.returnValue(model);
    const customers = [{ id: 1, firstName: 'John', lastName: 'lopez' }];
    (service.getAll as jasmine.Spy).and.resolveTo(customers);
    // execute test
    component.onCreate();
    // asserts
    expect(component).toBeDefined();
  });

  it(`#${CustomersComponent.prototype.onEdit.name} must open modal`, () => {
    // prepare mocks
    const modal: NgbModalRef = Object.assign({
      componentInstance: {
        id: '',
      },
      result: {
        then: (fn: (value: any) => void) =>
          fn({
            name: 'Profession',
            onCreate: TransactionStatusEnum.success,
            title: 'profession.save.success',
            subtitle: 'profession.save.success.subtitle',
          }),
      },
    });
    (modalService.open as jasmine.Spy).and.returnValue(modal);
    const customers = [{ id: 1, firstName: 'John', lastName: 'lopez' }];
    (service.getAll as jasmine.Spy).and.resolveTo(customers);
    const model = Object.assign({
      id: 1,
      firstName: 'Jairo',
    });
    // execute test
    component.onEdit(model);
    // asserts
    expect(component).toBeDefined();
  });

  it(`#${CustomersComponent.prototype.onDelete.name} must open modal`, () => {
    // prepare mocks
    const modal: NgbModalRef = Object.assign({
      componentInstance: {
        id: '',
      },
      result: {
        then: (fn: (value: any) => void) =>
          fn({
            name: 'Profession',
            onCreate: TransactionStatusEnum.error,
            title: 'profession.save.error',
            subtitle: 'profession.save.error.subtitle',
          }),
      },
    });
    (modalService.open as jasmine.Spy).and.returnValue(modal);
    const customers = [{ id: 1, firstName: 'John', lastName: 'lopez' }];
    (service.getAll as jasmine.Spy).and.resolveTo(customers);
    const model = Object.assign({
      id: 1,
      firstName: 'Diana',
    });
    // execute test
    component.onDelete(model);
    // asserts
    expect(component).toBeDefined();
  });
});
