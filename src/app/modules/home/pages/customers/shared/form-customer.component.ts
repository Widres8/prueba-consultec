import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { VehicleDealersService } from '@core/services';
import { Customer, DocumentType, VehicleDealer } from '@shared/models';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
})
export class FormCustomerComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  maxLength: number = 50;
  vehicleDealers: VehicleDealer[] = [];
  documentTypes: DocumentType[] = [
    { id: 1, name: 'Cedula de ciudadania' },
    { id: 2, name: 'NIT' },
    { id: 3, name: 'Cedula de extranjeria' },
  ];

  @Input() initialState: { [key: string]: any } = {};
  @Output() onSubmitEvent = new EventEmitter<Customer>();

  constructor(
    private activeModal: NgbActiveModal,
    private vehicleDealersService: VehicleDealersService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  async loadData() {
    this.vehicleDealers = await this.vehicleDealersService.getAll();
  }

  onSubmit(): void {
    this.onSubmitEvent.emit(this.form.value);
  }

  onClose(): void {
    this.activeModal.close();
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl(this.initialState['firstName'] ?? null, [
        Validators.required,
        Validators.maxLength(this.maxLength),
      ]),
      lastName: new FormControl(this.initialState['lastName'] ?? null, [
        Validators.required,
        Validators.maxLength(this.maxLength),
      ]),
      documentType: new FormControl(this.initialState['documentType'] ?? null, [
        Validators.required,
        Validators.maxLength(this.maxLength),
      ]),
      document: new FormControl(this.initialState['document'] ?? null, [
        Validators.required,
        Validators.maxLength(this.maxLength),
      ]),
      phone: new FormControl(this.initialState['phone'] ?? null, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      vehicleDealer: new FormControl(
        this.initialState['vehicleDealer'] ?? null,
        [Validators.required]
      ),
    });
  }
}
