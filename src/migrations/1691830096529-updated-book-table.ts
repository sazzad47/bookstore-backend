import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedBookTable1691830096529 implements MigrationInterface {
    name = 'UpdatedBookTable1691830096529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "price" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "price" integer NOT NULL`);
    }

}
