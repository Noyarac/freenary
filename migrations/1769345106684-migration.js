/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Migration1769345106684 {
    name = 'Migration1769345106684'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "investment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "frequency" integer, "organism" varchar, "delay" integer, "scpiLabId" integer, "ticker" varchar, "type" varchar CHECK( "type" IN ('Scpi','Stock') ) NOT NULL)`);
        await queryRunner.query(`CREATE INDEX "IDX_94b4fc965122aff2fece6ddd17" ON "investment" ("type") `);
        await queryRunner.query(`CREATE TABLE "distribution" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "amount" integer NOT NULL, "investmentId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "movement" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "investmentId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_distribution" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "amount" integer NOT NULL, "investmentId" integer NOT NULL, CONSTRAINT "FK_b12ad16749d7c6414acfd2f07ce" FOREIGN KEY ("investmentId") REFERENCES "investment" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_distribution"("id", "date", "amount", "investmentId") SELECT "id", "date", "amount", "investmentId" FROM "distribution"`);
        await queryRunner.query(`DROP TABLE "distribution"`);
        await queryRunner.query(`ALTER TABLE "temporary_distribution" RENAME TO "distribution"`);
        await queryRunner.query(`CREATE TABLE "temporary_movement" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "investmentId" integer NOT NULL, CONSTRAINT "FK_830354962110377fe0a9c4ff562" FOREIGN KEY ("investmentId") REFERENCES "investment" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_movement"("id", "date", "quantity", "price", "investmentId") SELECT "id", "date", "quantity", "price", "investmentId" FROM "movement"`);
        await queryRunner.query(`DROP TABLE "movement"`);
        await queryRunner.query(`ALTER TABLE "temporary_movement" RENAME TO "movement"`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movement" RENAME TO "temporary_movement"`);
        await queryRunner.query(`CREATE TABLE "movement" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "investmentId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "movement"("id", "date", "quantity", "price", "investmentId") SELECT "id", "date", "quantity", "price", "investmentId" FROM "temporary_movement"`);
        await queryRunner.query(`DROP TABLE "temporary_movement"`);
        await queryRunner.query(`ALTER TABLE "distribution" RENAME TO "temporary_distribution"`);
        await queryRunner.query(`CREATE TABLE "distribution" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "amount" integer NOT NULL, "investmentId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "distribution"("id", "date", "amount", "investmentId") SELECT "id", "date", "amount", "investmentId" FROM "temporary_distribution"`);
        await queryRunner.query(`DROP TABLE "temporary_distribution"`);
        await queryRunner.query(`DROP TABLE "movement"`);
        await queryRunner.query(`DROP TABLE "distribution"`);
        await queryRunner.query(`DROP INDEX "IDX_94b4fc965122aff2fece6ddd17"`);
        await queryRunner.query(`DROP TABLE "investment"`);
    }
}
