"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStockToBook1692214905897 = void 0;
class AddStockToBook1692214905897 {
    name = 'AddStockToBook1692214905897';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "book" ADD "stock" integer NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "stock"`);
    }
}
exports.AddStockToBook1692214905897 = AddStockToBook1692214905897;
