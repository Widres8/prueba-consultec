import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomerService } from '@core/services';
import { TransactionStatusEnum } from '@shared/enums';
import { Customer } from '@shared/models';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
})
export class CreateCustomerComponent {
  constructor(
    private service: CustomerService,
    private activeModal: NgbActiveModal
  ) {}

  async onSubmit(form: Customer) {
    let result = {
      name: form.firstName,
      title: 'Creación de cliente',
    };
    try {
      this.service.create(form);
      this.activeModal.close({
        ...result,
        onCreate: TransactionStatusEnum.success,
        subtitle: 'Creado Correctamente',
      });
    } catch (error: any) {
      this.activeModal.close({
        ...result,
        onCreate: TransactionStatusEnum.error,
        subtitle: 'Ocurrio un error',
      });
    }
  }
}
