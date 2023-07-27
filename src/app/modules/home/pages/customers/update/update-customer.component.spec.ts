import { UpdateProfessionComponent } from './update-profession.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfessionService } from '../profession.service';

describe('UpdateProfessionComponent', () => {
  let component: UpdateProfessionComponent;
  let service: ProfessionService;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    service = jasmine.createSpyObj<ProfessionService>('ProfessionService', [
      'update',
      'getById',
      'validateDataAssociated',
    ]);
    activeModal = jasmine.createSpyObj('NgbActiveModal', ['close']);

    component = new UpdateProfessionComponent(service, activeModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`ngOnInit must init component and loat elements`, () => {
    component.id = '1234-5678';
    const model = {
      id: '1234-5678',
      name: 'Ingenierio',
    };
    (service.getById as jasmine.Spy).and.resolveTo(model);

    component.ngOnInit();
    expect(service.getById).toHaveBeenCalled();
  });

  it(`onSubmit must update profession`, () => {
    component.id = '1234-5678';
    const model = {
      id: '1234-5678',
      name: 'Ingenierio',
    };
    (service.getById as jasmine.Spy).and.resolveTo(model);
    (service.validateDataAssociated as jasmine.Spy).and.resolveTo(false);
    (service.update as jasmine.Spy).and.resolveTo(model);

    component.ngOnInit();
    component.onSubmit(model);
    expect(service.validateDataAssociated).toHaveBeenCalled();
  });

  it(`onSubmit must update profession dont exec`, () => {
    component.id = '1234-5678';
    const model = {
      id: '1234-5678',
      name: 'Ingenierio',
    };
    component.profession = model;
    (service.getById as jasmine.Spy).and.resolveTo(model);
    component.ngOnInit();
    component.onSubmit(model);
    expect(activeModal.close).toHaveBeenCalled();
  });

  it(`onSubmit must update profession and error`, () => {
    (service.update as jasmine.Spy).and.throwError(
      new Error('Failed to delete')
    );
    component.id = '1234-5678';
    component.onSubmit({ name: '', id: '1234-5678' });
    expect(service.validateDataAssociated).toHaveBeenCalled();
  });

  it('modal close', () => {
    component.onClose();
    expect(activeModal.close).toHaveBeenCalled();
  });
});
