/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Init1768751662824 {
    name = 'Init1768751662824'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "events" ("id" integer PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "amount" integer NOT NULL, "type" varchar CHECK( "type" IN ('0','1','2') ) NOT NULL, "investment_id" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "investments" ("id" integer PRIMARY KEY NOT NULL, "organism" varchar NOT NULL, "name" varchar NOT NULL, "frequency" integer NOT NULL, "delay" integer NOT NULL, "type" varchar CHECK( "type" IN ('0','1') ) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_events" ("id" integer PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "amount" integer NOT NULL, "type" varchar CHECK( "type" IN ('0','1','2') ) NOT NULL, "investment_id" integer NOT NULL, CONSTRAINT "FK_18b9359eaf969471601763af1fd" FOREIGN KEY ("investment_id") REFERENCES "investments" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_events"("id", "date", "amount", "type", "investment_id") SELECT "id", "date", "amount", "type", "investment_id" FROM "events"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`ALTER TABLE "temporary_events" RENAME TO "events"`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "events" RENAME TO "temporary_events"`);
        await queryRunner.query(`CREATE TABLE "events" ("id" integer PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "amount" integer NOT NULL, "type" varchar CHECK( "type" IN ('0','1','2') ) NOT NULL, "investment_id" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "events"("id", "date", "amount", "type", "investment_id") SELECT "id", "date", "amount", "type", "investment_id" FROM "temporary_events"`);
        await queryRunner.query(`DROP TABLE "temporary_events"`);
        await queryRunner.query(`DROP TABLE "investments"`);
        await queryRunner.query(`DROP TABLE "events"`);
    }
}
