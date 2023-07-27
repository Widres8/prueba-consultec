import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomerService } from '@core/services';
import { StatusEnum, TransactionStatusEnum } from '@shared/enums';
import { Customer } from '@shared/models';

@Component({
  selector: 'app-delete-profession',
  template: `
    <div class="modal-header border-0 mt-3">
      <h4 class="text-primary">Inactivar Cliente</h4>
    </div>
    <div class="modal-body">¿Esta seguro de inactivar el cliente?</div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-primary rounded-1"
        (click)="onClose()"
      >
        <i class="fa-solid fa-xmark"></i>
        Cancelar
      </button>

      <button
        type="button"
        class="btn btn-primary rounded-1"
        (click)="onSubmit()"
      >
        <i class="fa-solid fa-floppy-disk"></i>
        Guardar
      </button>
    </div>
  `,
})
export class DeleteCustomerComponent {
  item: Customer = Object.assign({});

  constructor(
    private service: CustomerService,
    private activeModal: NgbActiveModal
  ) {}

  async onSubmit() {
    let result = {
      name: this.item.firstName,
      title: 'Inactivar de cliente',
    };
    try {
      this.item.status = StatusEnum.Disabled;
      this.service.update(this.item);
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
