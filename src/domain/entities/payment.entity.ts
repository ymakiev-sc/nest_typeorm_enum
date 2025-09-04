import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseColumns } from './base-columns';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

@Entity('payment')
export class PaymentEntity extends BaseColumns {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'PK_payment_request',
  })
  id: string;

  @Column({
    type: 'enum',
    enum: PaymentProvider,
    enumName: 'payment_provider_enum',
    nullable: true,
    name: 'provider',
  })
  provider: PaymentProvider;

  @Column({
    name: 'status',
    type: 'enum',
    enumName: 'payment_provider_enum',
    enum: PaymentStatus,
    nullable: true,
  })
  status: PaymentStatus;
}
