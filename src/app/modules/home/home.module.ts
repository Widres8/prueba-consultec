import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { CreateCustomerComponent } from './pages/customers/create/create-customer.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { DeleteCustomerComponent } from './pages/customers/delete/delete-customer.component';
import { FormCustomerComponent } from './pages/customers/shared/form-customer.component';
import { UpdateCustomerComponent } from './pages/customers/update/update-customer.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    CustomersComponent,
    FormCustomerComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent,
    DeleteCustomerComponent,
  ],
  imports: [HomeRoutingModule, SharedModule],
})
export class HomeModule {}
