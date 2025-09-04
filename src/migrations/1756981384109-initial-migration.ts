import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1756981045941 implements MigrationInterface {
  name = 'InitialMigration1756981045941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."payment_source_type" AS ENUM('RushGame', 'Subscription', 'MerchOrder', 'ExternalPurchase', 'LuckyWheel', 'TgLuckyWheel', 'Fighters')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_provider_enum" AS ENUM('Cryptex', 'PayPal', 'Stripe', 'PayOp', 'NOWpayments', 'UDSPayment', 'Mobile', 'TON_USDT_Payment', 'TON_Payment', 'VirtualUDSPayment', 'VIRTUAL_TON_USDT_PAYMENT', 'VIRTUAL_TON_PAYMENT')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_status_enum" AS ENUM('Active', 'Deactivated', 'Suspended', 'Expired')`,
    );
    await queryRunner.query(
      `CREATE TABLE "api-key" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" character varying NOT NULL, "source" character varying NOT NULL, "source_type" "public"."payment_source_type", "available_providers" "public"."payment_provider_enum" array NOT NULL, "status" "public"."payment_status_enum" NOT NULL DEFAULT 'Active', "source_web_hook" character varying, "secret_key" character varying, CONSTRAINT "PK_api_key" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" "public"."payment_provider_enum", "status" "public"."payment_provider_enum", "provider_payment_id" character varying, "transaction_hash" character varying(100), "order" json NOT NULL, "payer_email" character varying NOT NULL, "payer_name" character varying, "payer_phone" character varying, "payer_extra_fields" json, "payer_wallet_address" character varying(42), "language" character varying NOT NULL, "result_url" character varying NOT NULL, "fail_path" character varying NOT NULL, "metadata" json, "error" character varying, "result" json, "source_id" character varying, CONSTRAINT "PK_payment_request" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_payment_to_api_key_source" FOREIGN KEY ("source_id") REFERENCES "api-key"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_payment_to_api_key_source"`,
    );
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "api-key"`);
    await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payment_provider_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payment_source_type"`);
  }
}
