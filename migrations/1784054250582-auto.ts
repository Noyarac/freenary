import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1784054250582 implements MigrationInterface {
    name = 'Auto1784054250582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Split" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "ratio" integer NOT NULL, "investmentId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_Split" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "ratio" integer NOT NULL, "investmentId" varchar NOT NULL, CONSTRAINT "FK_81d3269bd4a10eeaa9e60bf80f2" FOREIGN KEY ("investmentId") REFERENCES "Investment" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Split"("id", "date", "ratio", "investmentId") SELECT "id", "date", "ratio", "investmentId" FROM "Split"`);
        await queryRunner.query(`DROP TABLE "Split"`);
        await queryRunner.query(`ALTER TABLE "temporary_Split" RENAME TO "Split"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Split" RENAME TO "temporary_Split"`);
        await queryRunner.query(`CREATE TABLE "Split" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "ratio" integer NOT NULL, "investmentId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "Split"("id", "date", "ratio", "investmentId") SELECT "id", "date", "ratio", "investmentId" FROM "temporary_Split"`);
        await queryRunner.query(`DROP TABLE "temporary_Split"`);
        await queryRunner.query(`DROP TABLE "Split"`);
    }

}
