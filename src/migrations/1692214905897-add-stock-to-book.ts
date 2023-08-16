import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStockToBook1692214905897 implements MigrationInterface {
    name = 'AddStockToBook1692214905897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "stock" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "stock"`);
    }

}
