"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatedPurchaseTable1691840799001 = void 0;
class UpdatedPurchaseTable1691840799001 {
    name = 'UpdatedPurchaseTable1691840799001';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "totalPrice" numeric(10,2) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "totalPrice" integer NOT NULL`);
    }
}
exports.UpdatedPurchaseTable1691840799001 = UpdatedPurchaseTable1691840799001;
