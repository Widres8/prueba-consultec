import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomerService } from '@core/services';
import { TransactionStatusEnum } from '@shared/enums';
import { Customer } from '@shared/models';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
})
export class UpdateCustomerComponent {
  item: Customer = Object.assign({});
  form: Customer = Object.assign({});

  constructor(
    private service: CustomerService,
    private activeModal: NgbActiveModal
  ) {}

  async onSubmit(form: Customer) {
    let result = {
      name: form.firstName,
      title: 'Actualización de cliente',
    };
    try {
      this.service.update({ ...form, id: this.item.id });
      this.activeModal.close({
        ...result,
        onCreate: TransactionStatusEnum.success,
        subtitle: 'Actualizado Correctamente',
      });
    } catch (error: any) {
      this.activeModal.close({
        ...result,
        onCreate: TransactionStatusEnum.error,
        subtitle: 'Ocurrio un error',
      });
    }
  }

  onClose(): void {
    this.activeModal.close();
  }
}
