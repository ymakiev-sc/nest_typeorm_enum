import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentProvider } from '../enums/payment-provider.enum';

@Entity('payment')
export class PaymentEntity {
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
}
