import { VehicleDealers } from './vehicle-dealers.model';

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  documentType: string;
  document: string;
  phone: string;
  vehicleDealer: VehicleDealers;
}
