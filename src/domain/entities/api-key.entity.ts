import { Column, Entity, PrimaryColumn } from 'typeorm';
import { PaymentSourceType } from '../enums/payment-source-type.enum';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { ApiKeyStatus } from '../enums/api-key-status.enum';
import { BaseColumns } from './base-columns';

@Entity('api-key')
export class ApiKeyEntity extends BaseColumns {
  @PrimaryColumn('varchar', { primaryKeyConstraintName: 'PK_api_key' })
  id: string;

  @Column({
    name: 'source_type',
    enum: PaymentSourceType,
    enumName: 'payment_source_type',
    type: 'enum',
    nullable: true,
  })
  sourceType: PaymentSourceType;

  @Column({
    type: 'enum',
    enum: PaymentProvider,
    enumName: 'payment_provider_enum',
    array: true,
    name: 'available_providers',
  })
  availableProviders: PaymentProvider[];

  @Column({
    type: 'enum',
    enum: ApiKeyStatus,
    enumName: 'payment_status_enum',
    default: ApiKeyStatus.Active,
    name: 'status',
  })
  status: ApiKeyStatus;
}
