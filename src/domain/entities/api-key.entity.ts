import { ApiKeyStatus } from '@app/common/enums/api-key-status.enum';
import { PaymentProvider } from '@app/common/enums/payment-provider.enum';
import { BaseColumns } from '@app/database-provider/entities/base-columns';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PaymentEntity } from './payment.entity';
import { Exclude } from 'class-transformer';
import { EnumName } from '../enums/enum-name.enum';
import { PaymentSourceType } from '@app/common/enums/payment-source-type';

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
        enumName: EnumName.PaymentSourceType,
        type: 'enum',
        nullable: true,
    })
    sourceType: PaymentSourceType;

    @Column({
        type: 'enum',
        enum: PaymentProvider,
        enumName: EnumName.PaymentProvider,
        array: true,
        name: 'available_providers',
    })
    availableProviders: PaymentProvider[];

    @Column({
        type: 'enum',
        enum: ApiKeyStatus,
        enumName: EnumName.ApiKeyStatus,
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

    @OneToMany(() => PaymentEntity, payment => payment.source, { eager: false })
    @Exclude()
    payments: PaymentEntity[];

    @Exclude()
    @Column({
        name: 'secret_key',
        type: 'varchar',
        nullable: true,
    })
    secretKey: string;
}
