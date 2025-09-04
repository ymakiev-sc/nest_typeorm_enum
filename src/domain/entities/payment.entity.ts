import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseColumns } from './base-columns';
import { ApiKeyEntity } from './api-key.entity';
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

  @ManyToOne(() => ApiKeyEntity, (apiKey) => apiKey.id, { eager: true })
  @JoinColumn({
    name: 'source_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_payment_to_api_key_source',
  })
  source: ApiKeyEntity;
}
