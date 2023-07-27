import { TransactionStatusEnum } from '@shared/enums';

export interface Toast {
  name: string;
  status: TransactionStatusEnum;
  title: string;
  subtitle: string;
  show: boolean;
  classname: string;
}
