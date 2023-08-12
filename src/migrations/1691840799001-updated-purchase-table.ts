import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedPurchaseTable1691840799001 implements MigrationInterface {
    name = 'UpdatedPurchaseTable1691840799001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "totalPrice" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "totalPrice" integer NOT NULL`);
    }

}
