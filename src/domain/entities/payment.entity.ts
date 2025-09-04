import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseColumns } from './base-columns';
import { PaymentProvider } from '@app/common/enums/payment-provider.enum';
import { PaymentStatus } from '@app/common/enums/payment-status.enum';
import { JSONArray } from '@app/common/types/json.types';
import { ApiKeyEntity } from './api-key.entity';
import { EnumName } from '../enums/enum-name.enum';

interface PaymentOrderType {
    id: string;
    amount: string;
    currency: string;
    description?: string;
    items: JSONArray;
}

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
        enumName: EnumName.PaymentProvider,
        nullable: true,
        name: 'provider',
    })
    provider: PaymentProvider;

    @Column({
        name: 'status',
        type: 'enum',
        enumName: EnumName.PaymentStatus,
        enum: PaymentStatus,
        nullable: true,
    })
    status: PaymentStatus;

    @ManyToOne(() => ApiKeyEntity, apiKey => apiKey.id, { eager: true })
    @JoinColumn({
        name: 'source_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_payment_to_api_key_source',
    })
    source: ApiKeyEntity;

    // order id from external system (like payop, stripe, cryptex)
    @Column({
        name: 'provider_payment_id',
        type: 'varchar',
        nullable: true,
    })
    providerPaymentId: string;

    @Column({
        name: 'transaction_hash',
        type: 'varchar',
        nullable: true,
        length: 100,
    })
    transactionHash: string;

    // Order info
    @Column({
        name: 'order',
        type: 'json',
    })
    order: PaymentOrderType;

    // Payer info
    @Column({
        name: 'payer_email',
        type: 'varchar',
    })
    payerEmail: string;

    @Column({
        name: 'payer_name',
        type: 'varchar',
        nullable: true,
    })
    payerName: string;

    @Column({
        name: 'payer_phone',
        type: 'varchar',
        nullable: true,
    })
    payerPhone: string;

    @Column({
        name: 'payer_extra_fields',
        type: 'json',
        nullable: true,
    })
    payerExtraFields: any;

    @Column({
        name: 'payer_wallet_address',
        type: 'varchar',
        length: 42,
        nullable: true,
    })
    payerWalletAddress: string;

    // Other info
    @Column({
        name: 'language',
        type: 'varchar',
    })
    language: string;

    @Column({
        name: 'result_url',
        type: 'varchar',
    })
    resultUrl: string;

    @Column({
        name: 'fail_path',
        type: 'varchar',
    })
    failPath: string;

    @Column({
        name: 'metadata',
        type: 'json',
        nullable: true,
    })
    metadata: any;

    @Column({
        name: 'error',
        type: 'varchar',
        nullable: true,
    })
    error: string;

    @Column({
        name: 'result',
        type: 'json',
        nullable: true,
    })
    result: any;
}
