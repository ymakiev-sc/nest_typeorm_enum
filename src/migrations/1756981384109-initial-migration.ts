import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1756981045941 implements MigrationInterface {
  name = 'InitialMigration1756981045941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."payment_provider_enum" AS ENUM('Cryptex', 'PayPal', 'Stripe', 'PayOp', 'NOWpayments', 'UDSPayment', 'Mobile', 'TON_USDT_Payment', 'TON_Payment', 'VirtualUDSPayment', 'VIRTUAL_TON_USDT_PAYMENT', 'VIRTUAL_TON_PAYMENT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" "public"."payment_provider_enum", CONSTRAINT "PK_payment_request" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "api-key" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" character varying NOT NULL, "available_providers" "public"."payment_provider_enum" array NOT NULL, CONSTRAINT "PK_api_key" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "api-key"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TYPE "public"."payment_provider_enum"`);
  }
}
