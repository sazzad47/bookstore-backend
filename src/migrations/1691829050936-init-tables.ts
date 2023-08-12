import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTables1691829050936 implements MigrationInterface {
    name = 'InitTables1691829050936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "discountRate" double precision NOT NULL DEFAULT '0', "coverImage" character varying, "price" integer NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "quantity" integer NOT NULL, "totalPrice" integer NOT NULL, "bookId" integer, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_a4765c82e4faf4270abceb21fc6" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_a4765c82e4faf4270abceb21fc6"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
