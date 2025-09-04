import { Column, Entity, PrimaryColumn } from 'typeorm';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { BaseColumns } from './base-columns';

@Entity('api-key')
export class ApiKeyEntity extends BaseColumns {
  @PrimaryColumn('varchar', { primaryKeyConstraintName: 'PK_api_key' })
  id: string;

  @Column({
    type: 'enum',
    enum: PaymentProvider,
    enumName: 'payment_provider_enum',
    array: true,
    name: 'available_providers',
  })
  availableProviders: PaymentProvider[];
}
