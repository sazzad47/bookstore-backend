"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatedBookTable1691830096529 = void 0;
class UpdatedBookTable1691830096529 {
    name = 'UpdatedBookTable1691830096529';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "price" numeric(10,2) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "price" integer NOT NULL`);
    }
}
exports.UpdatedBookTable1691830096529 = UpdatedBookTable1691830096529;
