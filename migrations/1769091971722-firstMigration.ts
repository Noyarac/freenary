import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1769091971722 implements MigrationInterface {
    name = 'FirstMigration1769091971722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "investment" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "frequency" integer, "organism" varchar, "delay" integer, "type" varchar CHECK( "type" IN ('Scpi','Stock') ) NOT NULL)`);
        await queryRunner.query(`CREATE INDEX "IDX_94b4fc965122aff2fece6ddd17" ON "investment" ("type") `);
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "amount" integer NOT NULL, "type" varchar CHECK( "type" IN ('0','1','2') ) NOT NULL, "investmentId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_event" ("id" integer PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "amount" integer NOT NULL, "type" varchar CHECK( "type" IN ('0','1','2') ) NOT NULL, "investmentId" integer NOT NULL, CONSTRAINT "FK_6641d3fd39aca225471b370ed77" FOREIGN KEY ("investmentId") REFERENCES "investment" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_event"("id", "date", "amount", "type", "investmentId") SELECT "id", "date", "amount", "type", "investmentId" FROM "event"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`ALTER TABLE "temporary_event" RENAME TO "event"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" RENAME TO "temporary_event"`);
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "amount" integer NOT NULL, "type" varchar CHECK( "type" IN ('0','1','2') ) NOT NULL, "investmentId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "event"("id", "date", "amount", "type", "investmentId") SELECT "id", "date", "amount", "type", "investmentId" FROM "temporary_event"`);
        await queryRunner.query(`DROP TABLE "temporary_event"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP INDEX "IDX_94b4fc965122aff2fece6ddd17"`);
        await queryRunner.query(`DROP TABLE "investment"`);
    }

}
