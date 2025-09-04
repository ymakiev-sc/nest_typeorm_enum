import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PaymentSourceType } from '../enums/payment-source-type.enum';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { PaymentEntity } from './payment.entity';
import { ApiKeyStatus } from '../enums/api-key-status.enum';
import { BaseColumns } from './base-columns';

@Entity('api-key')
export class ApiKeyEntity extends BaseColumns {
  @PrimaryColumn('varchar', { primaryKeyConstraintName: 'PK_api_key' })
  id: string;

  @Column({
    name: 'source',
    type: 'varchar',
  })
  source: string;

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

  @Column({
    name: 'source_web_hook',
    type: 'varchar',
    nullable: true,
  })
  sourceWebHook: string;

  @OneToMany(() => PaymentEntity, (payment) => payment.source, { eager: false })
  payments: PaymentEntity[];

  @Column({
    name: 'secret_key',
    type: 'varchar',
    nullable: true,
  })
  secretKey: string;
}
