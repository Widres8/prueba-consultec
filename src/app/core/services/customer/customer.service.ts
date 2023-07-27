import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { Customer } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public readonly url: string = 'assets/data/customers.json';
  readonly customerKey: string = 'customerKey';
  customer: Customer = Object.assign({});

  constructor(private http: HttpClient, private storage: Storage) {}

  async getAll(): Promise<Customer[]> {
    let customers: Customer[] = this.getStorage();
    if (customers.length === 0) {
      customers = await firstValueFrom(this.http.get<Customer[]>(this.url));
      this.setStorage(customers);
    }
    return customers;
  }

  create(customer: Customer) {
    const customers: Customer[] = this.getStorage();
    customer.id = customers.length + 1;
    this.setStorage([...customers, customer]);
  }

  update(customer: Customer) {
    const customers: Customer[] = this.getStorage();
    const index = customers.findIndex((c) => c.id === customer.id);

    if (index >= 0) {
      customers[index] = {
        ...customer,
      };
      this.setStorage(customers);
    }
  }

  getStorage(): Customer[] {
    return JSON.parse(this.storage.getItem(this.customerKey) ?? '[]');
  }

  setStorage(item: Customer[]) {
    this.storage.setItem(this.customerKey, JSON.stringify(item));
  }
}
