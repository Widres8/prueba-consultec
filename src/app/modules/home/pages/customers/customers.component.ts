import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomerService } from '@core/services';
import { StatusEnum, TransactionStatusEnum } from '@shared/enums';
import { Customer, Toast } from '@shared/models';

import { CreateCustomerComponent } from './create/create-customer.component';
import { DeleteCustomerComponent } from './delete/delete-customer.component';
import { UpdateCustomerComponent } from './update/update-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit {
  toastModel: Toast = Object.assign({});
  customers: Customer[] = [];
  public StatusEnum = StatusEnum;

  constructor(
    private service: CustomerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.customers = await this.service.getAll();
  }

  onCreate() {
    const modal = this.modalService.open(CreateCustomerComponent, {
      centered: true,
      size: 'xl',
    });
    modal.result.then(async (result) => {
      if (result) {
        await this.showAlert(
          result.name,
          result.onCreate,
          result.title,
          result.subtitle
        );
      }
    });
  }

  onEdit(item: Customer) {
    const modal = this.modalService.open(UpdateCustomerComponent, {
      centered: true,
      size: 'xl',
    });
    modal.componentInstance.item = item;
    modal.result.then(async (result) => {
      if (result) {
        await this.showAlert(
          result.name,
          result.onCreate,
          result.title,
          result.subtitle
        );
      }
    });
  }

  onDelete(item: Customer) {
    const modal = this.modalService.open(DeleteCustomerComponent, {
      centered: true,
    });
    modal.componentInstance.item = item;
    modal.result.then(async (result) => {
      if (result) {
        await this.showAlert(
          result.name,
          result.onCreate,
          result.title,
          result.subtitle
        );
      }
    });
  }

  async showAlert(
    name: string,
    status: TransactionStatusEnum,
    title: string,
    subtitle: string
  ) {
    this.toastModel = {
      show: true,
      title,
      subtitle,
      name,
      status,
      classname:
        status == TransactionStatusEnum.success
          ? 'bg-success text-light'
          : 'bg-danger text-light',
    };

    if (status == TransactionStatusEnum.success) {
      this.loadData();
    }
  }
}
