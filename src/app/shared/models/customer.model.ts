import { StatusEnum } from '@shared/enums';
import { DocumentType } from './document-type.model';
import { VehicleDealer } from './vehicle-dealer.model';

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  documentType: DocumentType;
  document: string;
  phone: string;
  vehicleDealer: VehicleDealer;
  status: StatusEnum;
}
